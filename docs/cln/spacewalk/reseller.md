## Server Accounts and Spacewalk Account Management


To manage accounts using Spacewalk system via CLN UI, click _CloudLinux OS_ at the top menu and then click _Server accounts_ on the left sidebar.

![](/images/clnserveraccounts_zoom60.png)

The following data is available:

* Total licenses on account — a total number of CloudLinux licenses on this account
* Unused licenses — number of licenses with no server attached
* License cost —  the cost of licenses per month

The table contains the following information:

* Login — Spacewalk server account login
* First name — server owner first name
* Last name — server owner last name
* Company — server company-owner name
* Email
* Limited/used — total/used number of licenses
* Actions

The following actions are available:

* Add server account. To do so, click _Add account_. The Add server account popup opens.

    ![](/images/clnaddserveracc_zoom90.png)

    Fill in the form and click _Add Account_ to complete the action or _Cancel_ to close the popup.

* Edit server account. To do so, click ![](/images/clnedit.png). Edit server account popup opens. To save changes, click _Save account_ or click _Cancel_ to close the popup.
* Remove server account. To do so, click ![](/images/clnremove.png). Remove account popup opens. To confirm removing, click _Remove account_ or click _Cancel_ to close the popup.
* View server account details. To do so, click server login in the _Login_ column, the server account details page opens.

    ![](/images/clnserveraccinfo_zoom60.png)

The following data is available:

* System 0/0 — limit and used
* Email
* Name — a name of server owner
* Company — company-owner name

The table contains the following information:

* Token — a unique identifier for a key
* Created — the token (key) creation date
* Usage — number of servers registered on this key
* Actions

The following actions are available:

* Create key. To do so, click _Create key_ button. A created key will be added to the table automatically without any notification.
* Remove key. To do so, click ![](/images/clnremove.png). Key removing popup opens. Confirm the action by clicking _Remove_ or click _Cancel_ to close the popup.

