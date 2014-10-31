Selfie
======

Created for the SFMoMA Art+Data day. This application will show an image from an item in the SFMoMA collection and will place it next to a rapidly changing set of Flickr photos with that work as a subject. This will fail if no photo is returned from the SFMoMA API. Also, the photos on the right will not show up until they are all loaded. At this point there is no loading indicator.

To Install
----------
 `npm install`
 
Configure
---------

Copy config/default.json to config/local.json.

Apply for a [Flickr API key](https://www.flickr.com/services/apps/create/apply/) and put it in the config file. Also put the HTTP Basic Auth credentials for the SFMOMA API in the config file.

Start the app
-------------
 `node app`
