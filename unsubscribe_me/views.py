import urllib3
from flask import redirect, url_for, session, request, jsonify
from . import app, gmail
from .inbox import Inbox


@app.route('/')
def index():
    if 'access_token' in session:
        me = gmail.get('userinfo')
        user_id = me.data['id']
        access_token = get_access_token()
        inbox = Inbox(gmail, access_token, user_id)
        emails = inbox.emails
        return jsonify({"emails": emails, 'me': user_id})
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
    access_token = get_access_token()
    inbox = Inbox(gmail, access_token, user_id)
    emails = inbox.emails
    return jsonify({'me': user_id, "emails": emails})


@gmail.tokengetter
def get_access_token():
    return session.get('access_token')
