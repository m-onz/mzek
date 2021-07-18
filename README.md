
# mzek

## about

Experimental logging and monitoring tool built ontop of secure scuttlebutt (ssb),
This project in not affiliated with ssb (secure scuttlebut in any way).
This is an experiment.. use at your own risk!
If you are interested in doing a security audit of the first release get in touch.

## modules

* auditd [x] :: auditd logs
* aide check [ ] :: results from aide --check
* peers [ ] :: connected peers information
* node_info [ ] :: system information

## development

Run the server & client...

```sh
npm i
node ./genConfig.js # generate a CAP
sudo ./dev.sh
```

In another console run a command as sudo to test 

## TODO: before the first release...

* test on debian, raspian and centos systems
* create sandboxed users and groups to run mzek
* investige chroot and selinux sandbox for running mzek
* apply limits to the mzek groups
* create proper installation for debian & centos
* finish systemd & run everything as services
