from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
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
    body = db.Column(db.String(20000))
    date = db.Column(db.DateTime)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __init__(self, title, body, owner, date=None):
        self.title = title
        self.body = body
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

@app.route('/entry')
@app.route('/admin')
def admin():

    if 'username' not in session:
        return redirect('/login')

    entry_id = request.args.get('id')
    entry = ''
    if  entry_id:
        entry = Entry.query.filter_by(id=entry_id).first()

    username = session['username']
    entries = Entry.query.all()
    return render_template('admin.html', username=username, entry_id=entry_id, entry=entry, entries=entries)

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

@app.route('/new-entry', methods=['GET', 'POST'])
def create_newpost():
    error_title = ''
    error_body = ''

    if request.method == 'POST':
        owner = User.query.filter_by(username=session['username']).first()
        entry_title = request.form['entry-title']
        if not entry_title:
            error_title = "Please fill in the title"
        elif len(entry_title) > 120:
            error_title = "Please take a shorter title"
        else:
            entry_body = request.form['entry-body']
            if not entry_body:
                error_body = 'Please fill in the body'

            elif len(entry_body) > 20000:
                error_body = 'Your entry post exceeds the limit'

            else:
                entry_post = Entry(entry_title, entry_body, owner)
                db.session.add(entry_post)
                db.session.commit()
                entry_id = entry_post.id;
                return redirect("/admin")

    return render_template('new-entry.html', error_title=error_title, error_body=error_body, title="New Entry Post")


@app.route('/', methods=['POST', 'GET'])
@app.route('/index', methods=['POST', 'GET'])
def index():

    # form_name = request.form["matric"]
    results = 'Matric'
    if request.method == 'POST':
        form_a = request.form['exam-result']
        results = request.form['results']
    return render_template('index.html', results=results)


if __name__ == "__main__":
    app.run()
