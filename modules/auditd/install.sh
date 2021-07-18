#!/bin/bash
echo "run this as root to install auditd dependancy"
echo "install and enable auditd"
sudo apt install -y auditd audispd-plugins
sudo systemctl status auditd
sudo auditctl -s
