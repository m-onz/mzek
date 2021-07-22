#!/bin/bash
echo "mzek installing mzek depenencies"
echo "also applying some basic system hardening"
echo "this script must be run as root"
echo "after this script is finished please configure aide"
yum update
yum upgrade -y
ss -ltulpn
yum remove rpcbind
systemctl mask ctrl-alt-del.target
echo "tty1" > /etc/securetty
chmod 700 /root
perl -npe 's/umask\s+0\d2/umask 077/g' -i /etc/bashrc
perl -npe 's/umask\s+0\d2/umask 077/g' -i /etc/csh.cshrc
authconfig --passalgo=sha512 --update
chattr +i /etc/services
chattr +i /etc/passwd
chattr +i /etc/shadow
echo "Idle users will be removed after 15 minutes"
echo "Locking down Cron"
touch /etc/cron.allow
chmod 600 /etc/cron.allow
awk -F: '{print $1}' /etc/passwd | grep -v root > /etc/cron.deny
echo "Locking down AT"
touch /etc/at.allow
chmod 600 /etc/at.allow
awk -F: '{print $1}' /etc/passwd | grep -v root > /etc/at.deny
cat <<EOF > /etc/sysctl.conf
net.ipv4.ip_forward = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.tcp_max_syn_backlog = 1280
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.default.secure_redirects = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
net.ipv4.tcp_timestamps = 0
EOF
echo "tcp wrapping"
echo "ALL:ALL" >> /etc/hosts.deny
cat <<EOF > /etc/sysconfig/iptables
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
:RH-Firewall-1-INPUT - [0:0]
-A INPUT -j RH-Firewall-1-INPUT
-A FORWARD -j RH-Firewall-1-INPUT
-A RH-Firewall-1-INPUT -i lo -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp --icmp-type echo-reply -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp --icmp-type echo-request -j ACCEPT
-A INPUT -i eth0 -s 10.0.0.0/8 -j LOG --log-prefix "IP DROP SPOOF A: "
-A INPUT -i eth0 -s 172.16.0.0/12 -j LOG --log-prefix "IP DROP SPOOF B: "
-A INPUT -i eth0 -s 192.168.0.0/16 -j LOG --log-prefix "IP DROP SPOOF C: "
-A INPUT -i eth0 -s 224.0.0.0/4 -j LOG --log-prefix "IP DROP MULTICAST D: "
-A INPUT -i eth0 -s 240.0.0.0/5 -j LOG --log-prefix "IP DROP SPOOF E: "
-A INPUT -i eth0 -d 127.0.0.0/8 -j LOG --log-prefix "IP DROP LOOPBACK: "
-A RH-Firewall-1-INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
-A RH-Firewall-1-INPUT -j LOG
-A RH-Firewall-1-INPUT -j DROP
COMMIT
EOF
/sbin/service iptables save
echo "checking selinux is enforcing"
cp /etc/securetty /etc/securetty.bak
cat /dev/null > /etc/securetty
setenforce 1
sestatus
#echo "checking bad permissions"
#find /home -type f -perm 777
echo "enable auditd"
systemctl enable auditd.service
yum -y install aide
echo "aide installed... please configure it now..."
echo "aide --init"
echo "cp -p /var/lib/aide/aide.db.new.gz /var/lib/aide/aide.db.gz"
echo "aide --check"
echo "aude --update"
