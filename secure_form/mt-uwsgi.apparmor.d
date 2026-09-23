# AppArmor profile for UWSGI.
# Based on Krathalan's AppArmor profile for nginx.
# Krathalan's Homepage: https://github.com/krathalan/apparmor-profiles
# Copyright 2026 (C) RFDFW; Licensed under GPLv3

abi <abi/3.0>,
include <tunables/global>

profile mt-uwsgi /var/www/uwsgi/{mass-texter,mass-texter-rf,mass-texter-daic,mass-texter-testing,atwhatcost,secform.revolutionaryfront.org}/venv/bin/uwsgi {
  include if exists <local/mt-uwsgi>
  include <abstractions/base>
  include <abstractions/krathalans-nameservice>
  include <abstractions/nameservice>
  include <abstractions/apache2-common>
  include <abstractions/hosts_access>
  include <abstractions/ssl_certs>
  include <abstractions/ssl_keys>
  include <abstractions/dovecot-common>
  include <abstractions/nis>
  include <abstractions/openssl>
  include <abstractions/postfix-common>

  capability dac_override,

  /usr/lib/uwsgi/{,**} mr,
  /usr/share/nginx/{,**} r,
  /var/www/vhosts/{,**} r,
  /usr/local/nginx/{,**} r,
  /etc/mime.types r,
  /usr/share/modsecurity-crs/{,**} r,
  /usr/local/modsecurity/{,**} r,
  /usr/include/modsecurity/{,**} r,
  /usr/local/nginx/{,**} r,
  /var/www/uwsgi/{,**} rwmk,
  /var/www/wsgi/{,**} rwmk,
  /proc/sys/net/core/somaxconn rw,
  @{PROC}/@{pid}/cgroup r,
  /sys/fs/cgroup/{,**} r,

  /tmp/mass-texter.pid rwk,
  /tmp/awc.pid rwk,
  /tmp/mass-texter-rf.pid rwk,
  /tmp/mass-texter-daic.pid rwk,
  /tmp/mass-texter-testing.pid rwk,
  /tmp/secform.revolutionaryfront.org.pid rwk,
  /var/log/uwsgi/{,**} rwk,

  /run/secform.revolutionaryfront.org/{,**} rwk,
  /run/*_uwsgi.mt/{,**} rwk,  # */
  /run/*.uwsgi.pid rwk,  # */

  /var/www/uwsgi/*/venv/bin/{,**} rmix,  # */

  # Networking
  include <abstractions/krathalans-networking>
  capability net_bind_service,
  network netlink raw,
  network inet dgram,
  network inet stream,
  network inet6 dgram,
  network inet6 stream,
  /etc/letsencrypt/{,**} r,

  # Deny unnecessary permissions
  deny @{PROC}/sys/kernel/osrelease r,
}
