from flask import Flask, render_template, url_for, flash



app = Flask(__name__)
app.config['DEBUG'] = True



@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()
