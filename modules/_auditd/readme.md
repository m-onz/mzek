
# auditd

extra configuration

```

/etc/audit/auditd.conf

/etc/audit/rules.d/audit.rules

auditctl -s # rules in the configuration files above

auditctl -l # our custom rules

```

## custom rules

```

sudo auditctl -w /etc/shadow -p -r -k shadow_reads

sudo auditctl -k shadow_reads

sudo auditctl -W /etc/shadow -p -r -k shadow_reads

```

* -w adds a file to watch -W removes the file watch
* -p sets the activity: r (read) w (write) x (execute) or a (attribute change)
* -k set the key name which we can set to help us search for it later

Search on the key

```

ausearch -k shadow_reads

```
