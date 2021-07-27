
# `MzEK`

## about

experimental p2p loghost system build on secure scuttlebutt (ssb)

## status

* not ready!
* under active development

## modules

So far modules are just ssb-clients that append messages to the nodes feed.

* logfeed: injest a continous log stream
* tripwire: get an event if a commands output changes

## example config file

create a `mzek.config.yaml` file:

```yaml

ssb:
  cap: z4yEvTi2uarxJ+xiKPd34cvgAYWrL/M3uSxP6RbjgVQ=

# if the output of these commands changes an event will be fired
tripwires:
  services: systemctl list-units --type service --state running --plain
  listeningports: netstat -tunlp

# these are streams of continuos data
logfeeds:
  tcpdump: tcpdump -q -i wlp3s0
  auditd: tail -f /var/log/audit/audit.log

```

## notes

For development and testing I'm just making sure not to run as root and
 this requires allowing a non-root user to use tcpdump and read auditd
 logs.

I am planning to lock this down using an mzek group that has permissions
 to do what is needed. This will be limited and possibly run within a chroot
 jail or selinux jail.

```sh

# allow tcpdump to be run as a non-root user:

  sudo chown tcpdump:tcpdump /usr/sbin/tcpdump
  sudo chmod 755 /usr/sbin/tcpdump
  tcpdump -X
  ll /usr/sbin/tcpdump
  sudo setcap cap_net_raw,cap_net_admin=eip /usr/sbin/tcpdump
  sudo ln -s /usr/sbin/tcpdump /usr/local/bin/tcpdump

# allow auditd log to be run as a non-root user:

  sudo chown monz -R /var/log/audit/audit
  sudo chgrp monz -R /var/log/audit/audit

```
