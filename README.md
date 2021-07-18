
# mzek

## about

Experimental logging and monitoring tool built ontop of secure scuttlebutt (ssb),
This project in not affiliated with ssb (secure scuttlebut in any way).
This is an experiment.. use at your own risk!
If you are interested in doing a security audit of the first release get in touch.

## modules

auditd [ ]

## development

Run the server & client...

```sh

node server &
node client
```

Run the modules manually...

```sh

cd ./module/auditd
node index.js &
sudo ls # become sudo
./injest.sh & # this will pipe the auditd log to index.js

```

## todo

* create sandboxed users and groups to run mzek
* investige chroot and selinux sandbox for running mzek
* apply limits to the mzek groups
* create proper installation for debian & centos
* finish systemd & run everything as services
