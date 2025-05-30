
# MAx Web Server (BETA)
---

MAx Web Server sets up NGINX hosting on the server and automatically converts `.htaccess` files into corresponding NGINX 
configuration.

It seamlessly integrates with the LSAPI NGINX module,
which allows for better performance and resource usage.

:::tip  
MAx Web Server is supported on cPanel servers only, running CloudLinux OS 8 and later.
:::

## Installation

To use MAx Web Server, first install the `max_webserver` package:

```
dnf --enablerepo=cloudlinux-updates-testing install max_webserver
```

## Convert to NGINX hosting

After `max_webserver` package is installed, you can switch to NGINX by running:

```
apache2max_webserver setup
```

Note that this may take a while, so we recommend running this command in a `tmux` or `screen` session.

Any websites previously using LSAPI will be automatically switched to NGINX hosting with the LSAPI NGINX module.
Websites using PHP-FPM will be switched to NGINX hosting with PHP-FPM.
PHP websites using other handlers will be proxied to Apache.

After conversion is complete, no further action is required.
The monitoring subsystem, when detecting a change to an `.htaccess` runs conversions to NGINX configuration.
So you can continue using `.htaccess` files as usual.

:::tip  
Do not attempt to stop the Apache service or remove Apache packages after switching to NGINX.
The Apache service provides a safety net for websites that cannot be converted to NGINX.
:::

## Switch back to Apache hosting

To switch back to Apache, run:

```
apache2max_webserver reset
```

This command removes NGINX from your system and restores Apache configuration.

## Force use of Apache for a single website

To force individual website to be served by Apache, run:

```
apache2max_webserver proxy -d <domain>
```

For example, `apache2max_webserver proxy -d example.com`.


## Disable forced use of Apache for a single website

To disable forcing individual website to be served by Apache:

```
apache2max_webserver unproxy -d <domain>
```

Note that Apache may still serve the website, if:
* conversion of its `.htaccess` files fails in any way
* unsupported handler is used. MAx Web Server only supports PHP-FPM and MOD_LSAPI handlers

## List proxied websites

To list websites that are forced to be served by Apache:

```
apache2max_webserver list-proxied
```

This command lists all websites that are forced to be served by Apache and the reason for that.

## Other notes

MAx Web Server automatically converts `.htaccess` files to NGINX configuration, stored under the directory `/etc/nginx`
as `apache2nginx.conf` and files prefixed with `apache2nginx-`.

Please don't modify these files manually, as they will be overwritten by the monitoring subsystem.

Instead, if you want to augment the NGINX configuration, you can do any of the following:

* Work with your `.htaccess` files like usually, and let MAx Web Server automatically convert them to respective NGINX configuration
* Add files according to `ea-nginx` files conventions. Please refer to the [cPanel documentation](https://docs.cpanel.net/knowledge-base/web-services/nginx-with-reverse-proxy/).

## Frequently Asked Questions 

**Q: Is MAx Web Server available on all editions?**<br />
A: Yes, it is. However, **AccelerateWP** (*which provides more benefit in pair with MAx Web Server*) is available only for CloudLinux OS Shared PRO/Admin/Solo editions (not Legacy).

**Q: What happens if the conversion from Apache to NGINX fails?**<br />
A: In such cases, the system will automatically switch to proxy-pass mode on NGINX.

**Q: Which PHP handlers are supported?**<br />
A: MAx Web Server supports LSAPI and FPM PHP handlers, which can be managed via WHM/cPanel's MultiPHP Manager.

**Q: How can I diagnose and report proxy-pass issues?**<br />
A: Use the following commands:
* Run apache2max_webserver list-proxied to identify proxied websites and reasons.
* Check logs with:
```
cat /var/log/max_webserver.log | grep username | grep WARNING
```
or more specifically:
```
cat /var/log/max_webserver.log | grep user.com | grep proxy_pass
```
**Q: If one site on an account uses proxy-pass, does it affect other sites?**<br />
A: No. Only the sites that couldn’t be converted will use proxy-pass. Successfully converted sites will operate via NGINX.
