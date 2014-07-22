stamplay-hackernews
===================

**This project is built on the [Stamplay](https://stamplay.com) platform, with few lines of [jQuery](http://jquery.com) to show how to build your own clone of hacker news in tenth of minutes.**

You can test it anytime simply creating a new project on Stamplay and uploading all the frontend assets with our client or our browser based code editor.

Feel free to implement more cool features (see the last paragraph for ideas), contribute to this repo or clone it to use it by your own scopes. For any question drop an email to [giuliano.iacobelli@stamplay.com](mailto:giuliano.iacobelli@stamplay.com)

-----------------------
## Hacker News clone

This is a demo of what you can achieve with [Stamplay](http://stamplay.com).

It's somewhat of a clone of Hacker News. [View demo](https://68a5fe.stamplay.com/)

Currently, in order to show how to leverage Stamplay we used [jQuery](http://jquery.com), so it will work on any browser.

* Login with Facebook
* Publish a URL/Post
* Upvote them
* Comment on them
* Gain karma points
* See what other user posted
* Search Posts

Best of all, it has no server code it has barely some Javascript line. Prepare to be amazed.

The steps below are tailored for Mac environments :

Linux should mostly work the same.


This project is built on the Stamplay platform, with few lines of jQuery to show how to build your own clone of hacker news in tenth of minutes.

You can test it anytime simply creating a new project on Stamplay and uploading all the frontend assets with our client or our browser based code editor.


-----------------------
# Anatomy

HNclone is built around the following apis (components) of Stamplay

* [Users](http://docs.stamplay.apiary.io/#user)
* [Form](http://docs.stamplay.apiary.io/#form)
* [Gamification](http://docs.stamplay.apiary.io/#challenge)
* [Custom Objects](http://docs.stamplay.apiary.io/#customobject)
* [Email](http://docs.stamplay.apiary.io/#email)


## Requirements

Go to [your account](http://editor.stamplay.com/apps) and create a new app.

Other required services :

* A [Facebook App](http://developers.facebook.com/apps) to setup Facebook Login auth

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

![Gamification settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-19.49.13.png)


### Form
Form component is used to create a contact form to let our users reach out to us without leaving the app. Our contact form will have two fields, *email* and *message*.

![Form settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-20.14.38.png)

### Email
This component we doesn't need any setup but, couldn't be easier than that ;)



## Creating the Tasks




## Building the frontend

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


