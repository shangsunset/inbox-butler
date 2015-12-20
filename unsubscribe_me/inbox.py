import base64
import pprint
import urllib3


class Inbox():

    def __init__(self, gmail, access_token, user_id):
        self.gmail = gmail
        self.access_token = access_token
        self.user_id = user_id
        self.emails = self.get_emails()

    def get_emails(self):
        url = 'https://www.googleapis.com/gmail/v1/users/{}/messages?q=category:promotions+newer_than:1m'.format(self.user_id)
        messages = []

        try:
            res = self.gmail.get(url)
            if 'messages' in res.data:
                messages.extend(res.data['messages'])
            while 'nextPageToken' in res.data:
                page_token = res.data['nextPageToken']
                new_url = '{url}&pageToken={page_token}'.format(url=url, page_token=page_token)
                res = self.gmail.get(new_url)
                messages.extend(res.data['messages'])
        except urllib3.exceptions.HTTPError as err:
            print(err.code)

        emails = []
        for message in messages:
            email = self.parse_email_content(message['id'])
            emails.append(email.copy())

        return emails

    def parse_email_content(self, email_id):
        url = 'https://www.googleapis.com/gmail/v1/users/{}/messages/{}'.format(self.user_id, email_id)
        response = self.gmail.get(url)
        result = response.data['payload']
        if 'parts' in result:
            if len(result['parts']) > 1:
                body = result['parts'][1]['body']['data']
            else:
                if 'parts' in result['parts'][0]:
                    body = result['parts'][0]['parts'][0]['body']['data']
                else:
                    body = result['parts'][0]['body']['data']
        else:
            body = result['body']['data']

        decoded_body = base64.b64decode(body.replace('-', '+').replace('_', '/'))
        return {'email_id': email_id, 'body': decoded_body}
