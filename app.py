from flask import Flask,render_template,request,url_for,sessions,flash


#  instantiate the app
app = Flask('__name__')

@app.route("/",methods=["GET"])
def index():
    return render_template("index.html")




if __name__== "__main__":
    app.run(debug=True)

