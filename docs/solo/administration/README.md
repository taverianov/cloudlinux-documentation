
# Administration

This section contains information that will be useful for server 
administrators that want to automatize server configuration or do some
unusual things which are not available in the WEB UI.

[[toc]]

## OS detection

To get information about the current CloudLinux OS edition, you can run the following command:

    cldetect --detect-edition
    
A response for CloudLinux OS Solo will be like follows:

    CloudLinux OS Solo 

## Best practices for virtualization templates

While we recommend and support using of the usual [CloudLinux Solo](/solo/installation/) installation process, 
it may require more time than is necessary for Virtual Private Server (VPS) and Virtual Machine (VM) hosts. 

Instead, you can provision VPS or VM systems with a templated environment.

### Create a minimal installation for templating

Before you begin, you need the activation key that you will use for CloudLinux OS Solo installation. 
Follow the [installation](/solo/installation/) guide and create the minimal working CloudLinus OS Solo environment.
Use activation key to register your instance and get full access to repositories and run the
`yum update` command to fetch recent changes.

### Manage templates

#### Provisioning

We recommend using tools like `ansible` to add packages and tune server configuration.
You are free to install any control panels, tune settings and configure the default CloudLinux tools.

#### Finalize your template

If you install the control panel in your customized template, 
please run following commands once installation is done.

    /usr/bin/package_reinstaller.py
    
Commands above will fix hooks and control panel plugins after installation.

Before you save your customized template, it is required to remove license files:

    rm -f /etc/sysconfig/rhn/jwt.token*
    rm -f /etc/sysconfig/rhn/systemid*
    rm -f /etc/sysconfig/rhn/cl-rollout*

#### Updating templates

:::tip
We strongly recommend recreating templates at least once a month to keep images
fresh and up-to-date with the recent CloudLinux OS Solo repositories.
:::

There are two ways of templates update:

1. Recreate them from scratch each time (recommended).
2. Boot customized template, register instance again and run the `yum update` command.
   Don't forget to remove license keys from the template as described 
   in [Finalize your template](./#finalize-your-template).

#### Next steps

Save the modified environment as the template and publish it for your clients.
