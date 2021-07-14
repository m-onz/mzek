
netstat --statistics --raw

# listening programs
netstat -ap | grep udp
netstat -ap | grep http

netstat --verbose

# continuous output
netstat -c | node injest.js

# IPv6 IPv4 infos
netstat -g

# kernel interface table
netstat -ie

# network interface transactions
netstat -i

# kernal IP routing table
netstat -r

# display promiscuous mode
netstat -ac 5 | grep udp

# show services with PID
netstat -tp

# statistics
netstat -s
netstat -su # udp
netsat -st # tcp

# unix listening ports
netstat -lx

# all listening
netstat -l
