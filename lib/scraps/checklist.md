
# install checklist

www.ubuntupit.com/best-linux-hardening-security-tips-a-comprehensive-checklist

* update `apt-get update && apt-get upgrade` [ ]
* create privileged user: `adduser monz`, `usermod -a -G sudo monz` [ ]
* optional : ssh, disable root login.
* enable a firewall `apt-get install ufw` [ ]
* configure firewall rules `sudo ufw default deny incoming` [ ]
* use fail2ban if ssh is enabled [ ]
* check externally available services `sudo ss -atpu` [ ]

* logrotate pacakge [ ]
* logwatch / logcheck [ ]
* aide [ ]
* fail2ban denyhosts [ ]


* chrootkit
* maldet

enable selinux
sestatus

install selinux:
apt install selinux-basics selinux-policy-default -y

selinux-activate

:: checksec

# check for setuid and setgid files

```sh
sudo find / -user root -perm 4000 -print
sudo find / -group kmem -perm -2000 -print
-xdev
```

#

```sh

apt-get --purge remove xinetd nis yp-tools tftpd aftpd tfpd-hpa telnetd rsh-server -rsh-redone-server


sudo faillog -m 7

# check for empty passwords
sudo awk -F: '($2 == "") {print}' /etc/shadow

# check UID of non root users
sudo awk -F: '($3 == "0") {print}' /etc/passwd

sudo systemctl list-dependencies graphical.target

# with SUID and SGID enabled
sudo find / -perm /4000
sudo find / -perm /2000

# remove privs
sudo chmod 0755 /path
sudo chmod 0664 /path

sudo cat /etc/fstab

# disable IPv6 connectivity  [ ]

# check world writable files

find / -xdev -type d \( -perm -0002 -a ! -perm 1000 \) -print

# nowner files

find / -xdev -type d \( -perm -0002 -a ! -perm -1000 \) -print

# logs
sudo tail /var/log/kern.log
sudo tail /var/log/auth.log
sudo tail /var/log/boot.log
sudo tail /var/log/syslog

# appamrmor
sudo apparmor_status

# disable cron for all users (AS ROOT)
echo ALL >>/etc/cron.deny

# disable ctrl alt delete
systemctl mask ctrl-alt-del.target

# restrict core dumps [ ]
# enable exec shield [ ]

```

## using a loghost

store logs remotely using a loghost

syslogd -r
