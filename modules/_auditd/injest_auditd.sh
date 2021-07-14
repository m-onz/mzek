#!/bin/bash

echo "get path to injest_auditd.js"

sudo systemctl status auditd
sudo auditctl -s
sudo tail -f /var/log/audit/audit.log | node /home/monz/Desktop/mzek/modules/auditd.js
