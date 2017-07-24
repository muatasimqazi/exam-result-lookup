from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.config['DEBUG'] = True

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
