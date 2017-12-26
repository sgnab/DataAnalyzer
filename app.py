from flask import Flask
app=Flask(__name__)
app.config["SECRET_KEY"]="something"
ctx=app.app_context()
ctx.push()
with ctx:
    pass



