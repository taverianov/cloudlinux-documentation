# Introduction

CloudLinux OS Shared Hosting Pro was developed with shared hosting in mind. It’s a state-of-the-art operating system that gives shared hosting providers what they need: advanced automation, deep-look performance analytics, and centralized monitoring tools.

It includes additional tools to expand the functionality.

To activate the CloudLinux OS Shared Pro you have to purchase a Shared Pro license first, or upgrade the existing one from the [cln.cloudlinux.com](https://cln.cloudlinux.com) then activate a license on a server using the [same instructions](https://docs.cloudlinux.com/shared/cloudlinux_installation/#license-activation) just with a new key.

:::tip Info
Apart from the functionality described in this documentation section, the Shared Pro edition includes all the [CloudLinux Shared OS features](/shared/cloudlinux_os_components/#cloudlinux-os-components).
:::

## AccelerateWP

The [AccelerateWP](/shared-pro/accelerate-wp/) carries a suite of optimization features that can be enabled and automatically configured for the end user's site.

## Centralized Monitoring

[Centralized Monitoring](/shared-pro/centralized-monitoring/) is a tool that allows hosting administrators to monitor the load for all their servers and users.

## X-Ray

[X-Ray](/shared-pro/x-ray/) is a tool developed for website performance monitoring and performance issues detection. X-Ray can gather and visualize information about the top N slowest system functions, external requests, software modules and database queries of the client’s website.

## Link server to CLN account

**Why do we need a server linking to CLN?**  
One of the main CloudlinuxOS Shared Pro features is Centralized Monitoring. In case when a customer uses the license provided by the reseller the server registered with such license will be linked to the reseller's CLN account. As a result, customers cannot see the data in Centralized Monitoring. To allow a customer to see the data in such a case we implemented an ability to link the server to the customer's own CLN account.

**Who can use it?**  
Only customers who use CloudlinuxOS Shared Pro licenses provided by resellers.

**How to link a server?** 
If your server is linkable you will see in the Cloudlinux Manager UI (Dashboard tab) the component with input field which allows linking the server to CLN.

![](/images/cm-ui-component.png)

To link the server, it is required to perform the following:

1. Create a CLN account if you do not have one [https://cln.cloudlinux.com/console/register/customer](https://cln.cloudlinux.com/console/register/customer).
2. Log into your CLN account and copy the linking token. If you click the “Get the token” button you will be redirected to [https://cln.cloudlinux.com/console/profile/details](https://cln.cloudlinux.com/console/profile/details) where can copy the token
3. Paste the token into the “Enter token” input and click the “Link server” button

After these steps you server will be linked. And you will see it in the Centralized Monitoring.

![](/images/linked-server-centralized-monitoring.png)

### CLI utility /usr/sbin/cl-link-to-cln 

We can also bind a server from the command line. To do this can be used `/usr/sbin/cl-link-to-cln` utility.

```
# /usr/sbin/cl-link-to-cln --help
Usage: cl-link-to-cln [options]

Options:
  -h, --help            show this help message and exit
  -t TOKEN, --linking-token=TOKEN
                        Token to link the server
  -s, --linking-status  Show if status linked or not
```

To link we have to:

1. Check if the server can be linked:
```
# /usr/sbin/cl-link-to-cln --linking-status
{
    "result": "success",
    "timestamp": 1698670480.3382068,
    "linked": false,
    "linkable": true
}
```

* **linked (boolean)** field define if server is already linked
* **linkable (boolean)** field define if server can be linked

2. Link the server with the command:
```
/usr/sbin/cl-link-to-cln --linking-token=TOKEN
```

Token you can find here [https://cln.cloudlinux.com/console/profile/details](https://cln.cloudlinux.com/console/profile/details).