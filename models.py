import bcrypt
from wtforms import Form,validators,StringField,PasswordField,BooleanField

from flask_pymongo  import PyMongo
from db_config import mongo_user,mongo_pass,mongo_DB

from app import app

app.config['MONGO_DBNAME']=mongo_DB
app.config['MONGO_URI'] = 'mongodb://'+mongo_user+":"+mongo_pass+"@ds131697.mlab.com:31697/users"
mongo = PyMongo(app)

class RegisterForm(Form):
    firstname=StringField(label="First name", validators=[validators.InputRequired()])
    lastname=StringField(label="Last name", validators=[validators.InputRequired()])
    email=StringField(label="Email", validators=[validators.InputRequired()])
    username=StringField(label="Username", validators=[validators.InputRequired()])
    pswd = PasswordField(label='Password',default='Password',validators =[validators.required(),
                                                          validators.EqualTo('confirm', message="Passwords must match.")])
    confirm = PasswordField("Repeat Password")
    accept_tos = BooleanField('I accept the Terms of Service and the Privacy Notice (last updated Dec 2017)',validators=[validators.required()])



users = mongo.db.users

def user_check(username):
    check_user = users.find_one({'username':username})
    if check_user:
        return True
    else:
        return False


def user_add(password,username):
    hash_pass = bcrypt.hashpw(password,bcrypt.gensalt())
    users.insert({"username":username,"password":hash_pass})
