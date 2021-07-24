
# `MzEK`

## about

Highly experimental p2p log monitoring and IDS based on secure scuttlebutt (but not affiliated with ssb). Logs from machines are stored and gossiped amongst connected
 peers to get real time events and resilient backups of logs useful for incident response
 and intrusion detection.

## status

in development

## modules

Modules are just ssb-clients that append messages to the nodes feed.

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

I run everything as a non-root user... I make tcpdump and auditd logs accessible from
 my non-root user. If this is not acceptable to you please do not use this.

I am going to delete the auditd log after its been added to the ssb feed... again
 this might not be what you want!

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

# todo: delete logs after they have been added
```
