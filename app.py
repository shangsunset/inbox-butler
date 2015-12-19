import urllib3
from flask import Flask, redirect, url_for, session, request, jsonify
from flask_oauthlib.client import OAuth
app = Flask(__name__)
app.secret_key = 'development'


API_KEY = 'AIzaSyC18XwmwFNG_MEB6PKmVaVFkc_PpI48UE4'
GOOGLE_ID = '470070395889-06tkamvds9t4id4lfj2bc18b224c76i9.apps.googleusercontent.com'
GOOGLE_SECRET = 'NI7nSP5cVNuoMahXV834zBQK'

oauth = OAuth(app)

gmail = oauth.remote_app(
    'gmail',
    consumer_key=GOOGLE_ID,
    consumer_secret=GOOGLE_SECRET,
    request_token_params={
        'scope': ['https://www.googleapis.com/auth/gmail.readonly', 'email']
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)


@app.route('/')
def index():
    if 'access_token' in session:
        me = gmail.get('userinfo')
        return jsonify({"data": me.data})
    return redirect(url_for('login'))


@app.route('/login')
def login():
    return gmail.authorize(callback=url_for('authorized', _external=True))


@app.route('/logout')
def logout():
    session.pop('access_token', None)
    return redirect(url_for('index'))


@app.route('/authorized')
def authorized():
    resp = gmail.authorized_response()
    if resp is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['access_token'] = (resp['access_token'], '')
    me = gmail.get('userinfo')
    user_id = me.data['id']
    get_emails(user_id)
    return jsonify({"data": me.data})


def get_emails(id):
    access_token = get_access_token()
    access_token = access_token[0]
    url = 'https://www.googleapis.com/gmail/v1/users/{}/messages?q=category:promotions+newer_than:3m'.format(id)
    messages = []

    try:
        res = gmail.get(url)
        if 'messages' in res.data:
            messages.extend(res.data['messages'])
        while 'nextPageToken' in res.data:
            page_token = res.data['nextPageToken']
            new_url = '{url}&pageToken={page_token}'.format(url=url, page_token=page_token)
            res = gmail.get(new_url)
            messages.extend(res.data['messages'])
    except urllib3.exceptions.HTTPError as err:
        print(err.code)

    # return messages
    print(messages)


@gmail.tokengetter
def get_access_token():
    return session.get('access_token')

if __name__ == "__main__":
    app.run(debug=True)
