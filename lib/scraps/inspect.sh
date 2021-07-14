
cat /etc/debian_version
uname -a
hostnamectl
uptime

who
who -Hu
grep sh$ /etc/passwd

sudo dmidecode -s system-manufacturer
sudo dmidecode -s system-product-name

sudo cat /sys/class/dmi/id/*

lscpu
sudo cat /proc/cpuinfo
sudo cat /proc/meminfo
sudo ifconfig -a

lspci
sudo dmidecode

cat /etc/apt/sources.list
ls -la  /usr/bin

# files
sudo lsof -nP -i # open files

# processes
pstree -pa 1
ps -ef
ps auxf
systemctl

# networking
sudo ss -atpu
sudo netstat -tulpn
sudo netstat -anp
sudo lsof -i
sudo ss
sudo iptables -L -n
cat /etc/resolv.conf

# kernel
sudo uname -r
sudo cat /proc/cmdline
sudo lsmod
sudo modinfo tcp_diag
sudo systemctl -a

# logs
sudo dmesg
sudo tail -f /var/log/messages
sudo journalctl -o json-pretty >> ./log.txt
