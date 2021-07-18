#!/bin/bash

node server &
node client &
cd /modules/auditd
sudo ls
./injest.sh
