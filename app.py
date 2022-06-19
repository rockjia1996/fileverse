from flask import Flask, render_template 
app = Flask(__name__)



@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/files")
def files():
    return render_template("files.html")


if __name__ == "__main__":
    app.run(debug = True)