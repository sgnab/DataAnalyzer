from flask import render_template,request,flash,Blueprint
from models import RegisterForm

from app import app
# The main page
@app.route("/",methods=["GET"])
def index():
    return render_template("index.html")

# The Login page
@app.route("/login",methods=["GET","POST"])
def login_system():
    return "login"

@app.route("/register",methods=["GET","POST"])
def register_handle():
    form=RegisterForm(request.form)
    return render_template("register.html", form=form)


if __name__== "__main__":
    app.run(debug=True)