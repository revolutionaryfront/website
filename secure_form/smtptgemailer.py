#!/usr/bin/env python
"""
Short script for sending out mass emails. Originally created to be used with
the SMTP2Go API. Now suports MailJet as well.


This file is part of Mass Texter.

Mass Texter is free software: you can redistribute it and/or modify it under
the terms of the GNU Affero General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option)
any later version.

Mass Texter is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along
with Mass Texter. If not, see <https://www.gnu.org/licenses/agpl-3.0.html>.

The source for this program should be available here:
    https://mt.oits.fail/static/mt-source-latest/
"""


from base64 import b64decode, b64encode
from smtp2go.core import Smtp2goClient
from mailjet_rest import Client as MjClient
from time import sleep
from os import system, remove, listdir
from pathlib import Path
from json import dumps as json_dumps
from minify_html import minify
import sys
import os



def send_email(email_sender, contact, email_subject, email_body,
               attachments=[], api_method='py', api_key='',
               api_secret='', smtp_provider='mailjet',
               email_sender_name='', email_sender_long='', delay=0):
    """Sends an email.
    Args:
        email_sender (str): Email address to send email from.
        email_sender_name (str): Name to use in email from field.
        contact (dict): Dict in format {'email': '', 'name': ''} containing
            contact information of recipient.
        email_subject (str): Email subject.
        email_body (str): Email body.
        attachments (list): List of files to attach to email. Not currently
            used.
        api_method (str): API method to use. Only used if smtp_provider is
            set to 'smtptg'. Can be 'py' or 'curl'.
        api_key (str): API key to use used with SMTP provider.
        api_secret (str): Secret key to use with API. Required by MailJet,
            ignored if using SMTP2Go.
        smtp_provider (str): SMTP provider to use. Can be 'mailjet' or
            'smtptg'.
        email_sender_long (str): Unused.
        delay (int): Time in seconds to sleep following sending email.
    Returns:
        Tuple with slot 0 containing 0 for success and -1 for failure and slot
            1 containing the API return code or -1 if failure occurs before
            the API has been accessed.
    """
    if '.' not in contact['email'] or '@' not in contact['email']:
        return (-1, -1)

    if smtp_provider == 'smtptg':
        r = send_email_smtptg(email_sender, contact, email_subject, email_body,
                              attachments=attachments, api_method=api_method,
                              api_key=api_key)
    elif smtp_provider == 'mailjet':
        #if not email_sender_name or not api_secret or not api_key:
        #    print('Mailjet error.')
        #    return (-1, -1)
        r = send_email_mailjet(email_sender, contact, email_subject,
                               email_body, api_key=api_key,
                               api_secret=api_secret,
                               email_sender_name=email_sender_name)

    if delay:
        sleep(delay)

    if r:
        return (0, r)
    else:
        return (-1, r)


def send_email_mailjet(email_sender, contact, email_subject, email_body,
                       attachments=[], api_method='py',  api_key='',
                       api_secret='', email_sender_long='',
                       email_sender_name=''):
    """Sends an email using the MailJet API.
    Args:
        email_sender (str): Email address to send email from.
        email_sender_name (str): Name to use in email from field.
        contact (dict): Dict in format {'email': '', 'name': ''} containing
            contact information of recipient.
        email_subject (str): Email subject.
        email_body (str): Email body.
        attachments (list): List of files to attach to email. Not currently
            used.
        dry_run (bool): Skip sending email.
        api_key (str): API key to use used with SMTP provider.
        api_secret (str): Secret key to use with API. Required by MailJet,
            ignored if using SMTP2Go.
        smtp_provider (str): SMTP provider to use. Can be 'mailjet' or
            'smtptg'.
        email_sender_long (str): Unused.
    Returns:
        Returned API status code or False upon failure.
    """
    mailjet = MjClient(auth=(api_key, api_secret), version='v3.1')
    data = {
        'Messages': [{
                "From": {
                        "Email": email_sender,
                        "Name": email_sender_name,
                },
                "To": [
                        {
                                "Email": contact['email'],
                                "Name": contact['name'],
                        }
                ],
                "Subject": email_subject,
                # "TextPart": "This is a test email using the Mail Jet API.",
                "HTMLPart": email_body,
        }]
    }
    try:
        result = mailjet.send.create(data=data)
        return result.status_code
    except Exception as e:
        print(str(e))
        return False


def send_email_smtptg(email_sender, contact, email_subject, email_body,
                      attachments=[], api_method='py', dry_run=False,
                      api_key=''):
    """Sends an email using the SMTP2Go API.
    Args:
        email_sender (str): Email address to send email from.
        contact (dict): Dict in format {'email': '', 'name': ''} containing
            contact information of recipient.
        email_subject (str): Email subject.
        email_body (str): Email body.
        attachments (list): List of files to attach to email. Not currently
            used.
        api_method (str): API method to use. Only used if smtp_provider is
            set to 'smtptg'. Can be 'py' or 'curl'.
        dry_run (bool): Skip sending email.
        api_key (str): API key to use used with SMTP provider.
    Returns:
        API response or False upon failure.
    """
    if api_method == 'py':
        client = Smtp2goClient(api_key=api_key)
        if attachments:
            payload = {
                'sender': email_sender,
                'recipients': [contact['email']],
                'subject': email_subject,
                'html': email_body,
                'attachments': attachments,
            }
        else:
            payload = {
                'sender': email_sender,
                'recipients': [contact['email']],
                'subject': email_subject,
                'html': email_body,
            }


        response = client.send(**payload)
        if response.success:
            return response
        else:
            return False

    elif api_method == 'curl':
        if attachments:
            payload = {
                'sender': email_sender,
                'recipients': [contact['email']],
                'subject': email_subject,
                'html': email_body,
                'attachments': attachments,
            }
        else:
            payload = {
                'sender': email_sender,
                'recipients': [contact['email']],
                'subject': email_subject,
                'html': email_body,
            }
        json_payload = json_dumps(payload)
        curl_s = """curl --request POST \
     --url https://api.smtp2go.com/v3/email/send \
     --header 'Content-Type: application/json' \
     --header 'X-Smtp2go-Api-Key: %s' \
     --header 'accept: application/json' \
     --data '
%s
'""" % (api_key, json_payload)
        res = system(curl_s)
        return res


# Example CLI input for sending email using SMTP2Go API with curl.
"""
curl --request POST \
     --url https://api.smtp2go.com/v3/email/send \
     --header 'Content-Type: application/json' \
     --header 'X-Smtp2go-Api-Key: api-xxxxxxxxxxxxxxxxxx' \
     --header 'accept: application/json' \
     --data '
{
  "sender": "email@example.com",
  "to": [
    "friend@example.com"
  ],
  "subject": "My First Email",
  "text_body": "Hello from the other side."
}
'
"""

# Example payload from SMTP2Go API docs:
"""
payload = {
    "sender": "email@example.com",
    "recipients": ["matt@example.com"],
    "template_id": "4000252",
    "template_data": {
        "first_name": "first_name_Value",
        "email": "email_Value"
    }
    "custom_headers": {"Your-Custom-Headers": "Custom Values"}
}
"""
