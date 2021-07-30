
# `MzEK`

## status

* not ready!

## example config file

create a `mzek.config.yaml` file:

```yaml

ssb:
  cap: z4yEvTi2uarxJ+xiKPd34cvgAYWrL/M3uSxP6RbjgVQ=

# if the output of these commands changes an event will be fired
tripwires:
  services: systemctl list-units --type service --state running --plain
  listeningports: netstat -tunlp

# these are streams of continuous data
logfeeds:
  tcpdump: tcpdump -q -i wlp3s0
  auditd: tail -f /var/log/audit/audit.log

```
