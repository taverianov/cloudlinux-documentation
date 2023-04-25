# End-user X-Ray plugin

The end-user X-Ray plugin is enabled by default on CloudLinux OS Solo.

![](/solo_XRayEndUserPluginUIIcon.png)

## How to manage the end-user X-Ray plugin

The web interface of the end-user X-Ray plugin is almost the same as the X-Ray administrator interface.

![](/XRayEndUserUI.png)

But there are some differences and they are described further.

* End-users can create tasks only for their domains from the drop-down list:
  ![](/XRayEndUserUIStart.png)
* To specify URL or wildcard, end-users should use the input field next to the domain:
  ![](/XRayEndUserUiSpecifyURL.png)

:::warning Note
Tracing tasks created by an end-user will also be displayed in the administrator interface and administrators can manage
the end-user's tasks the same way as they manage their own. At the same time, tasks created by the administrator or
other end-users will not be displayed in the UI of the current user.
:::

## End-user X-Ray plugin limitations

* The end-user X-Ray plugin does not support creating continuous tasks.
* The administrator and the end-user can’t run the tracing task for the same Domain/URL at the same time. Once the
  administrator started a specific tracing task, the end-user will not be able to duplicate it. And the same is true for
  the administrators – they will just see the running task for the specific domain and see the notification that they're
  trying to create a tracing task with a duplicated URL.
* If continuous tracing is enabled for the domain, the end-user will not be able to create a new task for this domain
  because the same rule works - it will be a duplicate of the existing tracing tasks. The next warning will appear:

  ![](/XRayEndUserUIWarning.png)

  To solve this, the existing running tasks for the same Domain/URL should be stopped or completed. You can find more
  details about this in
  the [FAQ](https://docs.solo.cloudlinux.com/manager/#what-should-i-do-if-i-see-the-warning-task-is-duplicated-by-url).
