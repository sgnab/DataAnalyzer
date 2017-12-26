from flask import render_template,request,flash,redirect,url_for,session
from models import RegisterForm,mongo,check_user,add_user,users

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
    if request.method=="POST" and form.validate():
        stat = check_user(request.form['username'])
        if stat==True:
            flash("This username already taken")
            return redirect(url_for("register_handle"))
        else:

            username=request.form['username']
            email =request.form['email']
            password= request.form['pswd']
            first_name =request.form['firstname']
            last_name = request.form['lastname']
            print("dfghjkl")
            print("fffff",username, password, email, first_name, last_name)
            add_user(password,username,email,first_name,last_name)

            flash("welcome"+username)
            session['logged_in'] = True
            session['username'] = username
            return redirect(url_for("dashboard"))

    return render_template("register.html", form=form)

@app.route('/dashboard',methods=["GET","POST"])
def dashboard():
    return "I am a dashboard"


if __name__== "__main__":
    app.run(debug=True)