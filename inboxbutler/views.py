import time
import json
import pickle
from flask import redirect, url_for, session, request, jsonify, render_template
from . import app, gmail, redis
from .inbox import Inbox


@app.route('/api/subscriptions', methods=['GET', 'POST'])
def index():
    if 'access_token' in session:
        me = gmail.get('userinfo')
        user_id = me.data['id']
        user_email = me.data['email']
        access_token = get_access_token()
        start = time.time()
        inbox = Inbox(gmail, access_token, user_id, user_email)

        if request.method == 'GET':
            subscriptions = inbox.get_subscriptions()
            end = time.time()
            return jsonify({
                "subscriptions": subscriptions,
                'me': me.data,
                'count': len(subscriptions),
                'time': end - start,
                'request time': inbox.request_time
            })
        if request.method == 'POST':
            return prepare_to_unsubscribe(request, inbox, user_email)
    return session_expired()


def prepare_to_unsubscribe(request, inbox, user_email):
    unsubscribe_method = request.json['method']
    merchant = request.json['merchant']
    cancelled_subscriptions = inbox.get_canceled_subscriptions() or []

    if cancelled_subscriptions is not None:
        if merchant not in cancelled_subscriptions:
            cancelled_subscriptions.append(merchant)
            response = unsubscribe(inbox, user_email, unsubscribe_method, merchant)
        else:
            response = jsonify({'response': 'repeated action'})

    else:
        cancelled_subscriptions.append(merchant)
        response = unsubscribe(inbox, user_email, unsubscribe_method, merchant)

    pickled_list = pickle.dumps(cancelled_subscriptions)
    redis.set(user_email, pickled_list)

    return response


def unsubscribe(inbox, user_email, unsubscribe_method, merchant):
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
