# LoquendoBot
A loquendo bot made by wannabe developers

<a href="https://imgur.com/562WiO7"><img src="https://i.imgur.com/562WiO7.png" title="source: imgur.com" /></a>

## About
This bot is a electron app purely made of:
* HTML (Frontend)
* CSS (Frontend)
* Javascript (Frontend)
* Python (Backend)
* SQLite (Database)

All comunication of the backend to frontend is made with JSON using [py-shell](https://www.npmjs.com/package/python-shell)  
it is meant to be a simple bot, nothing overly complex and more importantly FREE!
## What you need before running the program
### Twitch:
* Client id: from [here](https://dev.twitch.tv/) place it in the settings.ini file under TWITCH > CLIENT_ID
* Client secret: from [here](https://dev.twitch.tv/) place it in the settings.ini file under TWITCH > CLIENT_SECRET
* OAuth token: from [here](https://twitchapps.com/tmi/) place it in the settings.ini file under TWITCH > OAUTH_TOKEN
* Channel name: place it in the settings.ini file under TWITCH > CHANNEL_NAME
* Username: place it in the settings.ini file under TWITCH > USERNAME
  
### Youtube:
* Required (1 or both)
    * channel id, place it in the settings.ini file under YOUTUBE > CHANNEL_ID
    * channel name, place it in the settings.ini file under YOUTUBE > CHANNEL_NAME
  
* Optional (if you can get a API key with no limit)
    1. Use the following [link](https://console.developers.google.com/cloud-resource-manager?organizationId=0&supportedpurview=project) Create Project
    2. Click Create Project, set name and click Create
    3. Head over to [Project](https://console.developers.google.com/projectselector2/apis/dashboard?organizationId=0&supportedpurview=project) Selection and select your Project
    4. Click ENABLE APIS AND SERVICES and Search for Youtube Data API v3 click on it and click Enable
    5. Click Credentials and Click Create Credentials and select API Key
    6. (Optional) After that click restrict key.
    7. (Optional) Under API restrictions select Restrict key and Select the Youtube Data API v3 and Save.
  
### Facebook:
* WIP
  
## To run the program (as a user)
* Run installer or portable mode
* Wait for the python requirements to install, it will restart itself
* Enter either your channel info in 

## For developers (if you want to develop for it or expand its functionality)

* [Optional] Run as administrator
* [Required] have [nodejs](https://nodejs.org/en/) installed
### To run as a developer
1. run command: npm install
2. run command: pip install
3.  npm start (to start the program)
### Recomendations 
* We use vscode with the following extensions:  
    * SQLite  
    * JavaScript Debugger  
    * NPM  
    * NPM Intellisense  
    * Python  
    * Pylance  
    * HTML CSS Support  
    * Todo Tree, i reccomend [this guide](https://thomasventurini.com/articles/the-best-way-to-work-with-todos-in-vscode/)  
* To build you need to globally install electron and electron-packager:
    * npm i -g electron  
    * npm i -g electron-packager  
    * to actually build the program run: electron-packager  

## Where to get voices
### Windows
* [Speech2Go](https://harposoftware.com/en/spanish-spain-/340-S2G-Jorge-Nuance-Voice.html).
### Linux
* WIP
### Mac
* WIP
## Custom node_modules
* Say.js: changes come from here [Marak/Say.js](https://github.com/Marak/say.js) this will make it possible to send encoding which serves for pronounciation of words better.

## Encoding options for better pronounciations (depends on the TTS language)
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings)