import time
import urllib3
from flask import redirect, url_for, session, request, jsonify, render_template
from . import app, gmail
from .inbox import Inbox


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


@app.route('/api/subscriptions')
def index():
    if 'access_token' in session:
        me = gmail.get('userinfo')
        user_id = me.data['id']
        access_token = get_access_token()
        start = time.time()
        inbox = Inbox(gmail, access_token, user_id)
        subscriptions = inbox.subscriptions
        end = time.time()
        return jsonify({
            "subscriptions": subscriptions,
            'me': user_id,
            'count': len(subscriptions),
            'time': end - start,
            'request time': inbox.request_time
        })
    return jsonify({
        'status': 400
    })


@app.route('/login')
def login():
    return gmail.authorize(callback=url_for('authorized', _external=True))


@app.route('/logout')
def logout():
    session.pop('access_token', None)
    return redirect('/')


@app.route('/authorized')
def authorized():
    resp = gmail.authorized_response()
    if resp is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['access_token'] = (resp['access_token'], '')
    return redirect('subscriptions')


@gmail.tokengetter
def get_access_token():
    return session.get('access_token')
