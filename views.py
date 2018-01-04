from flask import render_template,request,flash,redirect,url_for,session
from models import RegisterForm,mongo,check_user,add_user,users,LoginForm
import bcrypt
from app import app
from controller.log_decorator import login_required
from flask_bootstrap import Bootstrap
Bootstrap(app)

# The main page
@app.route("/",methods=["GET"])
def index():
    return render_template("index.html")

# The registeration page


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


@app.route("/login",methods=["GET","POST"])
def login():
    if 'username' in session:
        return "Here will be a dashboard for " + session['username']
    form=LoginForm(request.form)
    if request.method=="POST" and form.validate():
        print("start posting")
        username=request.form['username']
        pswd = request.form['password']

        current_user = users.find_one({'username': username})
        if  current_user:
            curr_pass = current_user['password']
            if bcrypt.hashpw(pswd.encode('utf-8'),curr_pass) == curr_pass:
                session['username']=current_user['username']
                session['logged_in'] = True
                return redirect('/dashboard')
            else:
                flash("Inavlid Username or Password")

        else:
            return redirect(url_for("register_handle"))
    return render_template("login.html", form=form)



@app.route('/dashboardf',methods=["GET","POST"])
# @login_required
def dashboardf():
    if 'username' in session:
        return "Here will be a dashboard for " + session['username']
    return render_template('dashboardf.html')
@app.route("/404",methods=["GET"])
def notFound():
    return render_template("404.html")

@app.route('/dashboard',methods=["GET","POST"])
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/logout',methods=["GET","POST"])
@login_required
def log_out():
    session.clear()
    return redirect(url_for('login'))

if __name__== "__main__":
    app.run(debug=True)