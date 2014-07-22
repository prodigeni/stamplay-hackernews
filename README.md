stamplay-hackernews
===================

**This project is built on the [Stamplay](https://stamplay.com) platform, with few lines of [jQuery](http://jquery.com) to show how to build your own clone of hacker news in tenth of minutes.**

You can test it anytime simply creating a new project on Stamplay and uploading all the frontend assets with our client or our browser based code editor. 

Feel free to implement more cool features (see the last paragraph for ideas), contribute to this repo or clone it to use it by your own scopes. For any question drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com)

-----------------------
## Hacker News clone

This is a demo of what you can achieve with [Stamplay](http://stamplay.com).

It's somewhat of a clone of Hacker News. [View demo](https://68a5fe.stamplay.com/)

Currently, in order to show how to leverage Stamplay APIs and keep it simple we used few lines of [jQuery](http://jquery.com) to implement the client side logic.

* Login with Facebook
* Publish a URL/Post
* Upvote them
* Comment on them
* Gain karma points
* See what other user posted
* Search Posts

Best of all, it has no server code it has barely some Javascript line. Prepare to be amazed.

-----------------------
# Anatomy

HNclone is built around the following apis (components) of Stamplay

* [Users](http://docs.stamplay.apiary.io/#user)
* [Form](http://docs.stamplay.apiary.io/#form)
* [Gamification](http://docs.stamplay.apiary.io/#challenge)
* [Custom Objects](http://docs.stamplay.apiary.io/#customobject)
* [Email](http://docs.stamplay.apiary.io/#email)
* [Mailchimp](http://mailchimp.com)


## Requirements

Go to [your account](http://editor.stamplay.com/apps) and create a new app.

Other required services :

* A [Facebook App](http://developers.facebook.com/apps) to setup Facebook Login auth
* A [Mailchimp](http://mailchimp.com) account


Optional services :

* [Google Analytics](http://google.com/analytics)


## Configuring the components

After creating a new app on [Stamplay](https://editor.stamplay.com) let's start by picking the component we want to use in our app that are: **User**, **Email**, **Gamification**, **Custom Objects** and **Form**.

Lets see one-by-one how they are configured:

### User
the app leverages Facebook Login to provide an easy login to its users. In order to activate yours you need to get an APPID and APPSecret on [Facebook Developer's portal](http://developers.facebook.com/apps), create an app and add Stamplay.com as authorized domain as you can see in the pic below. 

![Facebook app settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-17.43.24.png "Facebook app settings")

now you have the data to configure Facebook Login on your app's user module. Go back on Stamplay, select the user component, add Facebook as signup service and then cut and paste the App ID and App Secret and click save.


### Custom Object
For our Hacker News clone we use this module to represent the **Post** that users can publish on Hacker news. Our posts will have a title, url, description and other two attributes as showed in the picture below. 

After setting up this Stamplay will instantly expose Restful APIs for our newly created Post resource on the following endpoint ```https://APPID.stamplay.com/api/cobject/v0/post```

![Custom Object settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-19.38.29.png)


### Gamification
User activity on Hacker News is rewarded with Karma points, this component empower you to add gamification mechanics by defining challenges and achievements in your app. In this way we will be able to assign points to our users as soon as they post or comment new Posts on our Hacker News clone without having to write a single server side line of code.

Gamification's challenges can have one or more level that are unlocked when the user earns enough points. Every level has a graphic representation for both locked and unlocked state. Here we can see our one and only "superguru" level for the karma point challenge that user will unlock after they earn 900 points.

![Gamification settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-19.49.13.png)


### Form
Form component is used to create a contact form to let our users reach out to us without leaving the app. Our contact form will have two fields, *email* and *message*.

![Form settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-20.14.38.png)


### Email
This component we doesn't need any setup but, couldn't be easier than that ;)


### Mailchimp (optional)
To push email addresses of app's users to a Mailchimp list you only need to connect your account. Just click the "Connect" button and authorize Stamplay in interacting with your Mailchimp data.


-----------------------


## Creating the server side logic with Tasks

Now let's add the tasks that will define the server side of our app. For our app we want that:

####When a new user signup, we send him a welcome email
Trigger : User - On Signup

Action: Email - Send Email

**Send Email configuration**

	to: {{user.email}}  // this will be automatically replaced with user's email
	from: "welcome@stamplaynews.com"
	name: "Stamplay HN"
	Subject: "Welcome!"
	Body: "Hi {{user.displayName}}! Welcome to this clone of Hacker News built with <a href="http://stamplay.com">Stamplay</a>"


####When a new user signup, he automatically join the karma points challenge
Trigger : User - On Signup

Action: Gamification - Join Challenge

**Join Challenge configuration**

	challenge: hnkarma

####When a user publish a new post, he earns 10 points
Trigger : Custom Object - Create (new object created)

Action: Gamification - Add Points


**Create configuration**

	custom object: post 

**Add Points configuration**

	challenge: hnkarma
	points: 10


####When a user fills the contact form, we receive an email with the form's content

Trigger : Form - Submit

Action: Email - Send Email

**Form submit configuration**

	Form: contact

**Send Email configuration**

	to: address@email.com
	from: {{entry.data.email}}
	name: {{entry.data.email}}
	Subject: "New Message from Hacker News clone"
	Body: {{entry.data.message}}


####When a new user signup, adds him on a Mailchimp list (optional)
Trigger : User - On Signup

Action: Mailchimp - Subscribe to a List

**Subscribe to a List configuration**

	list: [your list name]
	email: {{user.email}}	



This should be the final result of the configured tasks


![Task overview](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-22.28.44.png)


_______________________________


## Building the frontend

Time to move to the frontend

### /index
### /newest
### /submit
### /item
### /contact



-----------------------
# Cloning

First, clone this repository :

    git clone git@github.com:Stamplay/stamplay-hackernews.git
    
Or download it as a zip file
	
	https://github.com/Stamplay/stamplay-hackernews/archive/master.zip 

Then you need to upload the frontend files in your app and you can do it in two ways:

* Copy/Upload them via the Layout section of your app on Stamplay editor
* [Get](http://cdn.stamplay.com/stamplay-sync/stamplay-sync.zip) and run **Stamplay Sync**, make it download the frontend assets of your app and then replace them with the ones you got from this repo. Stamplay Sync will upload everything for you on your app.


-----------------------
# Next steps

Here are a few ideas for further improvement :

* Use [Pusher](http://pusher.com) component to send realtime notification when a new post is created
* PushState support
* _Your idea here… ?_


