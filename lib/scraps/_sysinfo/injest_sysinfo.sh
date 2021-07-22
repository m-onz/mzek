#!/bin/bash

timedatectl
date
who -a
last
uname -a | node /home/monz/Desktop/mzek/modules/sysinfo.js
cat /proc/meminfo
cat /proc/cpuinfo
sudo sysctl -ar randomize
sudo sysctl -ar icmp
iostat
sudo ps aux
free -h
df -ht ext4
cat /etc/hosts
cat /etc/hostname
cat /etc/network/interfaces
ip addr
sudo journalctl --since "10 minutes ago"
nmap -v -sT localhost
systemctl list-units --type service --state running
ss -ltp
