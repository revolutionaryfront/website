#!/bin/bash
source /var/www/uwsgi/secform.revolutionaryfront.org/venv/bin/activate
cd /var/www/uwsgi/secform.revolutionaryfront.org
SF_RF_WORKING_DIR=/var/www/uwsgi/secform.revolutionaryfront.org /var/www/uwsgi/secform.revolutionaryfront.org/venv/bin/uwsgi --ini /var/www/uwsgi/secform.revolutionaryfront.org/uwsgi-sf_rf.ini
