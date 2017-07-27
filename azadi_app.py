from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.mysql import YEAR
from datetime import datetime

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://azadi-app:password@localhost:8889/azadi-app'
app.config['SQLALCHEMY_ECHO'] = True
db = SQLAlchemy(app)

app.secret_key = 'X68tVVWRUg5b^qd'

class Entry(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    batch = db.Column(db.Enum('9th', '10th', 'FA/FSc.', 'BA/BSc.', 'MA/MSc.'))
    term = db.Column(db.Enum('Yearly', 'Bi-annual'))
    year = db.Column(db.String(4))
    url = db.Column(db.String(20000))
    date = db.Column(db.DateTime)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, title, batch, term, year, url, owner, date=None):
        self.title = title
        self.batch = batch
        self.term = term
        self.year = year
        self.url = url
        self.owner = owner
        if date is None:
            date = datetime.utcnow()
        self.date = date

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    entries = db.relationship('Entry', backref='owner')

    def __init__(self, username, password):
        self.username = username
        self.password = password


@app.before_request
def require_login():
    allowed_routes = ['index', 'login', 'signup', 'static']
    if request.endpoint not in allowed_routes and 'username' not in session:
        return redirect('/login')

@app.route('/entry', methods=['post', 'get'])
@app.route('/admin', methods=['post', 'get'])
def admin():

    delete = ''
    entry = ''
    if request.args.get('edit'):
        entry_id = request.args.get('edit')
        return redirect('/admin/edit?id=' + entry_id)
    elif request.args.get('delete'):
        entry_id = request.args.get('delete')
        delete_entry = Entry.query.filter_by(id=entry_id).first();
        db.session.delete(delete_entry)
        db.session.commit();
    if 'username' not in session:
        return redirect('/login')


    entry_id = request.args.get('id')
    if  entry_id:
        entry = Entry.query.filter_by(id=entry_id).first()

    username = session['username']
    entries = Entry.query.order_by(Entry.date.desc()).all()

    return render_template('admin.html', username=username, entry_id=entry_id, entry=entry, entries=entries)

@app.route('/admin/edit', methods=['POST', 'GET'])
def edit():

    entry_id = request.args.get('id')
    entry = Entry.query.filter_by(id=entry_id).first()

    if request.method == 'POST':
        udpated_entry = Entry.query.filter_by(id=entry_id).first()
        udpated_entry.title = request.form['entry-title']
        udpated_entry.batch = request.form['entry-batch']
        udpated_entry.term = request.form['entry-term']
        udpated_entry.year = request.form['entry-year']
        udpated_entry.url = request.form['entry-url']
        db.session.commit()
        return redirect('/admin')

    return render_template('edit.html', entry=entry)

@app.route('/signup', methods=['POST', 'GET'])
def signup():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        verify = request.form['verify']

        if not username or not password or not verify:
            error = "One or more fields left blank"

        elif password != verify :
            error = "Passwords don't match"
        elif len(username) < 3:
            error = "Username too short"
        elif len(password) < 3:
            error = "Password too short"
        else:
            existing_user = User.query.filter_by(username=username).first()

            if not existing_user:
                new_user = User(username, password)
                db.session.add(new_user)
                db.session.commit()
                session['username'] = username
                return  redirect('/admin')
            else:
                error = "Username already exists"
        return render_template('signup.html', error=error)

    return render_template('signup.html')

@app.route('/login', methods=['POST', 'GET'])
def login():

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        username_error = ''
        password_error = ''
        if user:
            if user.password == password:
                session['username'] = username
                return redirect('/admin')

            if user.password != password :
                password_error = 'Incorrect password'

        else:
            username_error = "This username does not exist"

        return render_template('login.html', username_error=username_error, password_error=password_error)

    return render_template('login.html')

@app.route('/logout')
def logout():
    del session['username']
    return redirect('/')

@app.route('/new-result', methods=['GET', 'POST'])
def create_newpost():
    error_title = ''
    error_body = ''
    entry_owner = User.query.filter_by(username=session['username']).first()
    if request.method == 'POST':


        entry_title = request.form['entry-title']
        entry_batch = request.form['entry-batch']
        entry_term = request.form['entry-term']
        entry_year = request.form['entry-year']
        entry_url = request.form['entry-url']

        entry_post = Entry(entry_title, entry_batch, entry_term, entry_year, entry_url, entry_owner)
        db.session.add(entry_post)
        db.session.commit()
        entry_id = entry_post.id;
        return redirect("/admin")

        if not entry_title:
            error_title = "Please fill in the title"
        elif len(entry_title) > 120:
            error_title = "Please take a shorter title"
        else:
            entry_batch = request.form['entry-class']
            if not entry_batch:
                error_body = 'Please fill in the body'

            elif len(entry_batch) > 20000:
                error_body = 'Your entry post exceeds the limit'

            else:
                entry_post = Entry(entry_title, entry_batch, entry_term, entry_year, entry_url, owner)
                db.session.add(entry_post)
                db.session.commit()
                entry_id = entry_post.id;
                return redirect("/admin")

    return render_template('new-result.html', error_title=error_title, error_body=error_body, title="New Entry Post")


@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():

    results = ''
    exam_ninth = Entry.query.filter_by(batch='9th').first();
    exam_tenth = Entry.query.filter_by(batch='10th').first();
    exam_fa_fsc = Entry.query.filter_by(batch='FA/FSc.').first();
    exam_ba_bsc = Entry.query.filter_by(batch='BA/BSc.').first();
    exam_ma_msc = Entry.query.filter_by(batch='MA/MSc.').first();

    exam_results = [exam_ninth, exam_tenth, exam_fa_fsc, exam_ba_bsc, exam_ma_msc]
    if request.method == 'POST':
        form_a = request.form['exam-result']
        results = request.form['results']

    entry = Entry.query.order_by(Entry.date.desc()).first()
    return render_template('index.html', results=results, exam_results=exam_results, entry=entry)

if __name__ == "__main__":
    app.run()
