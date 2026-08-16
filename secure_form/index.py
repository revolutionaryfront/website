#!/usr/bin/env python3


from os import path
import datetime
import time
from base64 import b64decode, b64encode
import html
from flask import Flask, render_template, request, redirect, url_for, \
    jsonify, session
from smtptgemailer import send_email



app = Flask(__name__)


# Make this less stupid later.
#@app.route('/pubweb_form_key')
"""
def pubweb_form_key():
    pk = request.args.get('pk')
    if pk and pk == 'MTI3MTQK':
        return jsonify(b64decode('VFZSSk0wMVVVVXROVkZsNlRXcFpTd289').decode())
    return ''
"""


@app.route('/', methods=['POST', ])
def index():
    exp_key = b64decode('VFZSSk0wMVVVVXROVkZsNlRXcFpTd289').decode()
    recip_mail = 'secform@rfdfw.org'
    recip_name = 'Revolutionary Front Secure Form'
    redir_url = 'https://revolutionaryfront.org'
    redir_domains = ('revolutionaryfront.org', 'secform.revolutionaryfront.org',
                     'rfdfw.org', 'secform.rfdfw.org', 'oits.fail',
                     'rf.mt.oits.fail')

    r = request.form.get('formredir')
    if r and r.startswith('https://'):
        r_t = r.split('https://', 1)[-1]
        if r_t.startswith(redir_domains):
            redir_url = r
    form_key = request.form.get('k')
    if not form_key:
        return redirect(redir_url)
    if form_key.strip(' \r\n') != exp_key:
        return redirect(redir_url)

    email_subject = 'Website contact form submission received'
    email_message = html.escape(request.form.get('message'))
    contact = {
        'name': recip_name,
        'email': recip_mail,
    }
    email_sender = 'Revolutionary Front DFW <contact@rfdfwmail.org>'

    with open('/var/www/uwsgi/secform.revolutionaryfront.org/.local/'
              'mailjet_api_key', 'r') as fh:
        r = fh.read().split('\n')
        api_key = b64decode(r[0].strip()).decode()
        api_secret = b64decode(r[1].strip()).decode()

    if email_message:
        write_log('Sending email. email_sender=%s, contact=%s, '
                  'email_subject=%s' % (email_sender, contact, email_subject))
        try:
            send_email(email_sender, contact, email_subject, email_message,
                       smtp_provider='mailjet', api_key=api_key,
                       api_secret=api_secret)
        except Exception as e:
            write_log(str(e))
        time.sleep(1)
    return redirect(redir_url)

@app.route('/', methods=['GET', ])
def index_get():
    return redirect('https://revolutionaryfront.org')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        path.join(app.root_path, 'static'), 'favicon.ico',
        mimetype='image/vnd.microsoft.icon'
    )

@app.errorhandler(Exception)
def handle_error(e):
    write_log('Error. Path: %s, IP: %s, E: %s, Request: %s, '
              'Request.form: %s, Headers: %s.' %
              (request.full_path, request.remote_addr, str(e), request,
               request.form, str(request.headers)))
    return redirect('https://revolutionaryfront.org/')

def write_log(message, print_msg=True):
    log_file='/var/www/uwsgi/secform.revolutionaryfront.org/secform.log'
    now = datetime.datetime.now()
    utf8_msg = message.encode('utf-8')
    dt_message = "%s, %s\n" % (now.strftime("%Y-%m-%d %H:%M:%S"),
                               utf8_msg.decode('utf-8', 'replace'))
    with open(log_file, encoding='utf-8', mode='a') as fh:
        fh.write(dt_message)
    if print_msg:
        print(dt_message)
    return dt_message