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


## Configuring the backend

After creating a new app on [Stamplay](https://editor.stamplay.com) let's start by picking the component we want to use in our app that are: **User**, **Email**, **Gamification**, **Custom Objects** and **Form**.

Lets see one-by-one how they are configured:

**User**: the app leverages Facebook Login to provide an easy login to its users. In order to activate yours you need to get an APPID and APPSecret on [Facebook Developer's portal](http://developers.facebook.com/apps), create an app and add Stamplay.com as authorized domain as you can see in the pic below. 

![Facebook app settings](http://blog.stamplay.com/wp-content/uploads/2014/07/Schermata-2014-07-22-alle-17.43.24.png "Facebook app settings")

now you have the data to configure Facebook Login on your app's user module. Go back on Stamplay, select the user component, add Facebook as signup service and then cut and paste the App ID and App Secret and click save.







You can find an introduction on how Hull components work [here](http://hull.io/docs/components).

The document body initially contains only 2 components :

* [hullagram](app/widgets/hullagram/main.hbs) is a container that displays the login screen if the current user is not connected, and the [app](app/widgets/app/main.js) component if he is.
* [uploader](app/widgets/uploader/main.js) is used to display overlay notifications during file uploads.

Then when the user is connected via Twitter, the [app](app/widgets/app/main.js) component take over the whole page and starts to act as the main controller.

## Screens

### \#/pictures

The first screen is the public activity feed of the app.

It is implemented in the [pictures widget](app/widgets/pictures/main.js)

The data is fetched from the [Activities API](http://hull.io/docs/api#endpoint-activity)

The like buttons & like counts on the images comme from a component distributed with hull (like_button@hull) and that is just skinned here

### \#/likes

The pictures displayed are those liked by the current user.

It is implemented in the [likes component](app/widgets/likes/main.js)

The data is fetched from the [Likes API](http://hull.io/docs/api#endpoint-likes)

### \#/friends

Here we display the list of people that the current user follows on Twitter that also have a profile on the app.

We use the [packaged components](http://hull.io/docs/components) `friends_list@hull` and just override its [main template](app/widgets/friends_list/friends_list.hbs)

### \#/profile

Just displaying a user profile, the component is [here](app/widgets/profile)

### \#/comments

Comments use the packaged component comments@hull, with a [local template override](app/widgets/comments/comments.hbs).


## Taking pictures

We use the apis available on iOS6+ to have access to the camera, and a little trickery to give it a nice appearance.

    <input type="file" name="file" accept="image/*" capture="camera">

### Upload

The pictures are then uploaded to a [HullStore](http://hull.io/docs/services#hull-store) (wich is an S3 bucket with CORS activated) via the packaged `upload@hull` component.

The [uploader component](app/widgets/uploader) then reacts to events emmited by the `upload@hull` component to display upload status info. (by the way, it's a good example of the way components are supposed to interact in a components based [aura](https://github.com/aurajs/aura) / [hull](http://hull.io) app).


### Publication

Once the component is uploaded, the user gets a chance to review and describe it before its actual publication.

Confirming the publication then stores the picture as an [Image](http://hull.io/docs/api#endpoint-resources) that belongs to the user.

-----------------------
# Installing

First, clone this repository :

    git clone git://github.com/hull/hullagram.git

Install [node.js](http://nodejs.org) (Only used for building the app, not needed for deployment)

[grunt-cli](https://github.com/gruntjs/grunt-cli) as a global module.
It's amazing so you should do it anyways.

    [sudo] npm install grunt-cli -g

then install grunt and it's modules in the project's folder.

    cd hullagram/
    npm install

-----------------------
# Running the app

### To run the app locally, run:

    grunt server

-----------------------
# Deploying the app

### App & Organization Setup on hull

Go to [your org's dashboard](http://accounts.alpha.hullapp.io) and setup a few services :

Required services :

* A [Twitter App](http://hull.io/docs/services#twitter) to setup auth
* A [Hull store](http://hull.io/docs/services#hull-store) to store the uploaded images

Optional anlytics services :

* [Mixpanel](http://hull.io/docs/services#mixpanel) and / or
* [Google Analytics](http://hull.io/docs/services#google-analytics)

Then create a new hull app.

_Don't forget to whitelist your domains and to setup your `appId` and `orgUrl`in the Hull.init method (which is in located in the [index.html](app/index.html#L33-L38) file)._

### Deployment on Heroku

First create your heroku app if it's not done yet :

    heroku create my-own-hullagram

Build your app for deployement, and commit the compiled version:

    git checkout -b deploy
    grunt build
    git add -f dist
    git commit -m "Deployment build"

Deploy your app to heroku:

    git push git@heroku.com:my-own-hullagram.git `git subtree split --prefix dist deploy`:master --force
    open http://my-own-hullagram.herokuapp.com

-----------------------
# Next steps

Here are a few ideas for further improvement :

* Photo Filters
  With [caman.js](http://camanjs.com/)/[vintage.js](http://vintagejs.com/)
  or https://github.com/kudakurage/CSS-PhotoEditor-for-iOS6 + [svg foreignObject](https://developer.mozilla.org/en-US/docs/HTML/Canvas/Drawing_DOM_objects_into_a_canvas) + canvas drawImage()

* Tapping once on an image in a feed could open a detail view
* Tapping on the likes count cell in a profile view could show likes
* Doubletapping an image could like/unlike it
* Pull to refresh
* Add error handling to image uploads
* PushState support
* _Your idea here… ?_


