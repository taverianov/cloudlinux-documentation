
# Licensing

[[toc]]

## Getting license

You will need a trial or payed activation key to be able to use your CloudLinux OS Solo server. 
Please [refer to this page](https://lp.cloudlinux.com/cloudlinux-os-solo) to find information on how to get activation key.

The activation key looks like: `CLSOLO-d34463a182fede4f4d7e140f1841bcf2`

Use it to [activate your system](/solo/activation/#license-activation) 
or to [convert server to CloudLinux](/solo/installation/#converting-existing-servers) server.

:::warning
The CloudLinux OS Solo activation key is used ONLY for registration CloudLinux OS Solo 8.
Trying use it for registration CloudLinux OS Shared 6/7/8 or converting from CentOS 6/7/ 8 to CloudLinux OS Shared 6/7/8 cause errors.
:::

:::tip Note
Activation gives you access to the [CloudLinux Manager](/solo/manager/#cloudLinux_manager) features and system updates. 
:::

## License activation

There are several ways to register your server with CloudLinux Network:

using the activation key by following commands:

```
yum install rhn-setup --enablerepo=cloudlinux-base
/usr/sbin/rhnreg_ks --activationkey=<activation key>
```

using IP-based licensing:

```
yum install rhn-setup --enablerepo=cloudlinux-base
/usr/sbin/clnreg_ks
```