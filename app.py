from flask import Flask, jsonify, redirect, session, url_for, render_template
import os
import requests
from flask_cognito_lib import CognitoAuth
from flask_cognito_lib.decorators import (
    auth_required,
    cognito_login,
    cognito_login_callback,
    cognito_logout,
)

app = Flask(__name__)
app.secret_key='34fsfsdf#'
# Configuration required for CognitoAuth
app.config["AWS_REGION"] = "us-east-1"
app.config["AWS_COGNITO_USER_POOL_ID"] = "us-east-1_dnamRbGRc"
app.config["AWS_COGNITO_DOMAIN"] = "https://1059.auth.us-east-1.amazoncognito.com"
app.config["AWS_COGNITO_USER_POOL_CLIENT_ID"] = os.environ.get('client_id', "16hhbd5qd9cpb1u5jn2kejqhqm"  )
app.config["AWS_COGNITO_USER_POOL_CLIENT_SECRET"] = os.environ.get('client_secret',"1uk9vl7sh4fl3mglku8oh84jb80mv5a2ffl66ajfvgsn9amt36bt")
app.config["AWS_COGNITO_REDIRECT_URL"] =  os.environ.get('postlogin',"http://localhost:5000/postlogin")
app.config["AWS_COGNITO_LOGOUT_URL"] = os.environ.get('postlogout',"http://localhost:5000/postlogout")

auth = CognitoAuth(app)

def fetch_and_store_user_data(endpoint_url):
    try:
        response = requests.get(endpoint_url)
        
        if response.status_code == 200:
            user_data = response.json()
            session.update(user_data)
        else:
            print(f"Error: Failed to fetch data. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error: {str(e)}")
        return None


@app.route("/")
@cognito_login
def login():
    # A simple route that will redirect to the Cognito Hosted UI.
    # No logic is required as the decorator handles the redirect to the Cognito
    # hosted UI for the user to sign in.
    # An optional "state" value can be set in the current session which will
    # be passed and then used in the postlogin route (after the user has logged
    # into the Cognito hosted UI); this could be used for dynamic redirects,
    # for example, set `session['state'] = "some_custom_value"` before passing
    # the user to this route
    pass
@app.route("/login")
def try_login():
    return redirect(url_for('login'))

@app.route("/postlogin")
@cognito_login_callback
def postlogin():
    # A route to handle the redirect after a user has logged in with Cognito.
    # This route must be set as one of the User Pool client's Callback URLs in
    # the Cognito console and also as the config value AWS_COGNITO_REDIRECT_URL.
    # The decorator will store the validated access token in a HTTP only cookie
    # and the user claims and info are stored in the Flask session:
    # session["claims"] and session["user_info"].
    # Do anything after the user has logged in here, e.g. a redirect or perform
    # logic based on a custom `session['state']` value if that was set before
    # login
    return redirect(url_for("home"))


@app.route("/home")
def home():
    if 'user_info' not in session:
        return redirect(url_for("login"))

    # This route is protected by the Cognito authorisation. If the user is not
    # logged in at this point or their token from Cognito is no longer valid
    # a 401 Authentication Error is thrown, which can be caught by registering
    # an `@app.error_handler(AuthorisationRequiredError)
    # If their auth is valid, the current session will be shown including
    # their claims and user_info extracted from the Cognito tokens.
    if "userId" not in session:
        user_id =  session['user_info']['cognito:username']
        endpoint_url = f"https://cxka1yt3tj.execute-api.us-east-1.amazonaws.com/test/user?userId={user_id}"
        fetch_and_store_user_data(endpoint_url)
    return render_template("/index.html")


@app.route("/logout")
@cognito_logout
def logout():
    # Logout of the Cognito User pool and delete the cookies that were set
    # on login.
    # No logic is required here as it simply redirects to Cognito.
    pass


@app.route("/postlogout")
def postlogout():
    # This is the endpoint Cognito redirects to after a user has logged out,
    # handle any logic here, like returning to the homepage.
    # This route must be set as one of the User Pool client's Sign Out URLs.
    return redirect(url_for("login"))


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
