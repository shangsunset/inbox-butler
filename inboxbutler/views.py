import time
from flask import redirect, url_for, session, request, jsonify, render_template
from . import app, gmail
from .inbox import Inbox


@app.route('/api/subscriptions', methods=['GET', 'POST'])
def index():
    if 'access_token' in session:
        me = gmail.get('userinfo')
        user_id = me.data['id']
        user_email = me.data['email']
        access_token = get_access_token()
        start = time.time()
        inbox = Inbox(gmail, access_token, user_id)

        if request.method == 'GET':
            subscriptions = inbox.get_subscriptions()
            end = time.time()
            inbox = Inbox(gmail, access_token, user_id)
            return jsonify({
                "subscriptions": subscriptions,
                'me': me.data,
                'count': len(subscriptions),
                'time': end - start,
                'request time': inbox.request_time
            })
        if request.method == 'POST':
            unsubscribe_method = request.json['method']
            merchant = request.json['merchant']

            if 'email' in unsubscribe_method:
                email = unsubscribe_method['email']
                subject = unsubscribe_method['subject']
                r = inbox.send_email(email, user_email, subject, merchant)

                return jsonify({
                    'response': r.data
                })
            else:
                link = unsubscribe_method['link']
                return jsonify({'link': link})
    return session_expired()


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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


@app.errorhandler(403)
def session_expired(error=None):
    message = {
        'status': 403,
        'message': 'Session expired.'
    }
    resp = jsonify(message)
    resp.status_code = 403

    return resp


@gmail.tokengetter
def get_access_token():
    return session.get('access_token')