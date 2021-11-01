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
Twitch:
* Client id, from [here](https://dev.twitch.tv/) place it either in the .env file (developer) or in the settings.ini (release)
* Client secret, from [here](https://dev.twitch.tv/) place it either in the .env file (developer) or in the settings.ini (release)
* OAuth token, from [here](https://twitchapps.com/tmi/) place it either in the .env file (developer) or in the settings.ini (release)
* Streamer name, place this in the settings.ini
  
Youtube:
1. Use the following [link](https://console.developers.google.com/cloud-resource-manager?organizationId=0&supportedpurview=project) Create Project
2. Click Create Project, set name and click Create
3. Head over to [Project](https://console.developers.google.com/projectselector2/apis/dashboard?organizationId=0&supportedpurview=project) Selection and select your Project
4. Click ENABLE APIS AND SERVICES and Search for Youtube Data API v3 click on it and click Enable
5. Click Credentials and Click Create Credentials and select API Key
6. (Optional) After that click restrict key.
7. (Optional) Under API restrictions select Restrict key and Select the Youtube Data API v3 and Save.
  
Facebook:
* WIP
  
## To run the program

* [Optional] Run as administrator
* [Required] have [nodejs](https://nodejs.org/en/) installed

1. run command: npm install
2. run command: pip install pipenv (install the python module)
3. run command: pipenv --three (create python environment based on python 3)
4. run command: pip install
4. run command: pipenv shell (activate environment)
5. set pipenv as default python interpreter (this will have all the necesary modules already installed)
6.  npm start (to start the program)

## Recomendations (if you want to develop for it or expand its functionality)
* we use vscode with the following extensions:  
** SQLite  
** JavaScript Debugger  
** NPM  
** NPM Intellisense  
** Python  
** Pylance  
** HTML CSS Support
** Todo Tree, i reccomend [this guide](https://thomasventurini.com/articles/the-best-way-to-work-with-todos-in-vscode/)

* to build you need to globally install electron and electron-packager  
** npm i -g electron  
** npm i -g electron-packager  
** to actually build the program run: electron-packager  

## Where to get voices (windows)
* [Speech2Go](https://harposoftware.com/en/spanish-spain-/340-S2G-Jorge-Nuance-Voice.html).

## Custom node_modules
* Say.js: changes come from here [Marak/Say.js](https://github.com/Marak/say.js) this will make it possible to send encoding which serves for pronounciation of words better.

## Encoding options for better pronounciations (depends on the TTS language)
* [iconv-lite](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings)