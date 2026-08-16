#!/usr/bin/python3
import sys
import os

if 'SF_RF_WORKING_DIR' in os.environ.keys() and \
                        os.environ['SF_RF_WORKING_DIR'] not in sys.path:
    sys.path.insert(0, os.environ['SF_RF_WORKING_DIR'])
elif '/var/www/uwsgi/secform.revolutionaryfront.org' not in sys.path:
    sys.path.insert(0, '/var/www/uwsgi/secform.revolutionaryfront.org')
print('secformuwsgi starting with sys.path[0]=%s' % (sys.path[0],))

from index import app as application