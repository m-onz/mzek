#!/bin/bash

echo "starting mzek-server"
node server &
sleep 3
echo "starting mzek-client"
node client &
echo "starting auditd module"
sudo ls
cd ./modules/auditd/
./injest.sh
