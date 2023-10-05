# Uninstalling

### Deleting the CloudLinux Subsystem For Ubuntu

You can uninstall CloudLinux Subsystem For Ubuntu by running the following commands:

```
# apt install python3
```
```
# wget https://repo.cloudlinux.com/cloudlinux-ubuntu/sources/cln/ubuntu2cloudlinux.py
```
```
# python3 ubuntu2cloudlinux.py --uninstall
```
```
# reboot
```


In that case the script will:

* Remove the CloudLinux OS components which are installed on your system, choosing from the following list: lve, kmodlve-dkms, lve-utils, lve-stats, lvemanager, cagefs, alt-python, alt-php, db-governor.
* Remove configs for CloudLinux repositories for Ubuntu.
* Ask you to check for remaining packages from CloudLinux and manually reboot your system.
