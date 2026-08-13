#!/usr/bin/env python3
"""
Short script to receive data and send it to a hardcoded address as an email.
Nothing in this is actually used by Mass Texter, it was just easier to add it
to MT than to run it independently. This exists primarily to be used with
the RF website.

-----

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

The source for this program should be available here
    https://mt.oits.fail/static/mt-source-latest/
"""
from flask import request, redirect, jsonify
from flask_wtf.csrf import CSRFProtect
import time
from base64 import b64decode, b64encode

from mt import app
from mt.config import conf
from mt.smtptgemailer import send_email


WTF_CSRF_SECRET_KEY = app.secret_key
csrf = CSRFProtect(app)

# Make this less stupid later.
@app.route('/pubweb_form_key')
def pubweb_form_key(pk='MTI3MTQK'):
    pk = request.args.get('pk')
    if pk and pk == 'MTI3MTQK':
        return jsonify(b64decode('VFZSSk0wMVVVVXROVkZsNlRXcFpTd289').decode())
    return ''


@app.route('/pubweb_form_sub', methods=['POST', ])
@csrf.exempt
def pubweb_form_sub(email_message='', k='', formredir=''):
    r"""
    Receives POST data and fires off an email to mail_recip.
    ---
    parameters:
      - name: email_message
        in: body
        type: string
        description: Email message to be sent.
      - name: formredir
        in: body
        type: string
        description: URL to redirect to upon success.
      - name: k
        in: body
        type: string
        description: Key sent with form submission. Must match expected key
          for email to be sent.
    responses:
      302:
       description: Currently redirects to formredir form value when finished.
    """
    # This file is technically not really a part of Mass Texter, it's just
    # easier to have it run as part of the Mass Texter framework than
    # independently. For this reason things like recip_mail and exp_key are
    # hardcoded here and not included in conf.
    exp_key = b64decode('VFZSSk0wMVVVVXROVkZsNlRXcFpTd289').decode()
    recip_mail = 'secform@rfdfw.org'
    recip_name = 'Revolutionary Front Secure Form'
    redir_url = 'https://oits.fail/sec_form_test/'

    form_key = request.form.get('k')
    if not form_key:
        return redirect(redir_url)
    if form_key.strip(' \r\n') != exp_key:
        return redirect(redir_url)
    r = request.form.get('formredir')
    if r:
        redir_url = r

    email_subject = 'Website contact form submission received'
    email_message = request.form.get('message')
    contact = {
        'name': recip_name,
        'email': recip_mail,
    }
    email_sender = conf.email_blast.sending_address_full
    api_key = conf.email_blast.mailjet_api_key
    api_secret = conf.email_blast.mailjet_api_secret

    if email_message:
        time.sleep(3)
        send_email(email_sender, contact, email_subject, email_message,
                   smtp_provider='mailjet', api_key=api_key,
                   api_secret=api_secret, record_send=False)
        time.sleep(3)

    return redirect(redir_url)
