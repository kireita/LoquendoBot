import configparser
import os
import sys
import irc.bot
import requests
import json
import threading
import re
from py_linq import Enumerable
from dotenv import dotenv_values
from configparser import ConfigParser
from pathlib import Path

# Global variables
Emote_dictionary={}
EmoteRangeList=['']

config = configparser.ConfigParser()
# Get the absolute path of where the python file is running
path_to_python_file = os.path.dirname(__file__)
# Go back 2 folders to end up in the main folder structure
path_to_working_directory = str(Path(path_to_python_file).parents[1])
# Get the config.ini file in the directory
path_config_file = os.path.join(path_to_working_directory, 'config\\Settings.ini')
# Read the config file
config.read(path_config_file)

# Read Environment variables from .env file
envVariables = {
    **dotenv_values("././.env"),  # load shared development variables
}

# Twitch variables
# It will read the OS variables first, 
# if not found it will read from the config file (settings.ini),
# if that is not found either it will look at the local .env file values

try:
    client_id = os.environ["TWITCHCLIENTID"]
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_CLIENT_ID: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
except Exception:
    client_id = ''

try:
    client_secret = os.environ["TWITCHCLIENTSECRET"]
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_CLIENT_SECRET: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
except Exception:
    client_secret = ''

try:
    oauth_token = os.environ["TWITCHOAUTHTOKEN"]
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_OAUTH_TOKEN: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
except Exception:
    oauth_token = ''

if client_id =='':
    client_id = config['TWITCH']['CLIENT_ID']
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_CLIENT_ID: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
elif client_id is None:
    client_id = envVariables["TWITCH_CLIENT_ID"]
    
if client_secret == '':
    client_secret = config['TWITCH']['CLIENT_SECRET']
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_CLIENT_SECRET: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
elif client_secret is None:
    client_secret = envVariables["TWITCH_CLIENT_SECRET"]
    
if oauth_token =='':
    oauth_token = config['TWITCH']['OAUTH_TOKEN']
    consoleMessage_dict = {'Type':'Console','Message':"TWITCH_OAUTH_TOKEN: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
elif oauth_token is None:
    oauth_token = envVariables["TWITCH_OAUTH_TOKEN"]
    
username = config['TWITCH']['CHANNEL_NAME']
channel = config['TWITCH']['USERNAME']

#Takes the emote value (ex: '25:0-4') then sets MinRange and MaxRange (ex: 0 and 4)
# and adds the corresponding word to the dictionary
def addEmoteToDictionary(emoteValue, entireMessage):
    MinRange=0
    MaxRange=0
    #Right side is the list of ranges where the emote ID is used
    emoteRangeSide=emoteValue.split(':')[1]
    #Left side is the ID of the emote
    emoteIDSide=emoteValue.split(':')[0]
    #If there is more than one instance of a specific emote, they're separated by commas
    rangeInstances=emoteRangeSide.split(',')
    #For every range of the emote, add the identified word to the dictionary
    for range in rangeInstances:
        MinRange=range.split('-')[0]
        MaxRange=range.split('-')[1]
        #EmoteRangeList.append(rangeInstances)
        identifiedEmote=entireMessage[int(MinRange):int(MaxRange)+1] #substring identified as emote
        Emote_dictionary[identifiedEmote]=emoteIDSide #adds the word to the emote dictionary

#Receives the word to find an emote for.
# returns the same word if it wasnt found in the emote dictionary
# returns the constructed URL of the emote image to show if it was found
def emote_substitution(wordToCheck):
    EmoteURLleft='<img class="scale" src="https://static-cdn.jtvnw.net/emoticons/v2/'
    EmoteURLright='/default/dark/3.0" />'
    #Returns the left side of the list entrance... the emote ID
    if wordToCheck in Emote_dictionary:
        emoteID=Emote_dictionary[wordToCheck]
        return EmoteURLleft+emoteID+EmoteURLright
    else:
        return wordToCheck

def transform_Twitch_Emotes(emoteList, message):
    for emote in emoteList:
        addEmoteToDictionary(emote,message)
    #Separates the message in words by spaces
    tempStringList=message.split()
    transformedMessage=""
    for word in tempStringList:
        #Each word is checked on the emote_Substitution function. If it is
        #an emote it returns the corresponding URL to take place of the
        #original word. If its not an emote, the same word is added
        transformedMessage+=emote_substitution(word)
        transformedMessage+=" "
    return transformedMessage

# spawn a new thread to wait for input 
def get_user_input():
    while True == True:
        user_input = input()
        bot.send_message(user_input)

# TODO: Read banned user from DB
Baneados = ['fx25v','FX25V']

# request body to get bearer token and access token
body = {
    'client_id': client_id,
    'client_secret': client_secret,
    "grant_type": 'client_credentials'
}
# make the request and save it to r
r = requests.post('https://id.twitch.tv/oauth2/token', body)

#data output, this will contain the bearer access-token
keys = r.json();

# headers can now be used to request the enpoints of twitch API
headers = {
    'Client-ID': client_id,
    'Authorization': 'Bearer ' + keys['access_token']
}

class TwitchBot(irc.bot.SingleServerIRCBot):
    
    # Initialize chat
    def __init__(self):
        self.channel = '#' + channel

        # Create IRC bot connection
        server = 'irc.chat.twitch.tv'
        port = 6667
        
        message = 'Connecting to ' + server + ' on port ' + str(port) + '...'
        consoleMessage_dict = {'Type':'Console','Message':message}
        json_dict = json.dumps(consoleMessage_dict)
        print (json_dict, flush=True)
        irc.bot.SingleServerIRCBot.__init__(self, [(server, port, 'oauth:'+ oauth_token)], username, username)
    
    # Welcome message    
    def on_welcome(self, c, e):
        message = 'Joining ' + self.channel
        consoleMessage_dict = {'Type':'Console','Message':message}
        json_dict = json.dumps(consoleMessage_dict)
        print(json_dict, flush=True)

        # You must request specific capabilities before you can use them
        c.cap('REQ', ':twitch.tv/membership')
        c.cap('REQ', ':twitch.tv/tags')
        c.cap('REQ', ':twitch.tv/commands')
        c.join(self.channel)
        
    # Message from streamer
    def send_message(self,msg):
        c = self.connection
        message = 'StreamerMsg: ' + msg + "\n"
        consoleMessage_dict = {'Type':'Self','Message':message}
        json_dict = json.dumps(consoleMessage_dict)
        print(json_dict, flush=True)
        c.privmsg(self.channel, msg)

    # Recieve Message from viewer
    def on_pubmsg(self, c, e):

        # don't do anything with the message if it comes from another channel (restreambot)
        substring = e.arguments[0]
        if re.match(r'\[YouTube:(.*?)\]', substring):
            return
        
        dct = {}

        # if chat message is not a command process the message
        if e.arguments[0][:1] != '!':
            # Twitch complete message object from API
            twitchMessageObject = Enumerable(e.tags)
            
            # Chat message send by viewer
            Message = e.arguments[0]
            
            # Display Name of the viewer that send the message
            displayNameObject = twitchMessageObject.where(lambda x: x['key'] == 'display-name').to_list()
            displayName =displayNameObject[0]['value']
            
            # Badges
            badgesObject = twitchMessageObject.where(lambda x: x['key'] == 'badges') 
            if badgesObject[0]['value'] is not None:
                badges =badgesObject[0]['value']
                badges_list = badges.split(",")
            
            # Emoticons
            emoticonsObject = twitchMessageObject.where(lambda x: x['key'] == 'emotes') 
            if emoticonsObject[0]['value'] is not None:
                emoticons =emoticonsObject[0]['value']
                emoticons_list = emoticons.split("/")
                Message=transform_Twitch_Emotes(emoticons_list,Message)

            # Id of sender (to get the logo later)
            userIdObject = twitchMessageObject.where(lambda x: x['key'] == 'user-id')
            userId =userIdObject[0]['value'] 

            # Get logo with User Id
            if userId != '0':
                stream = requests.get('https://api.twitch.tv/helix/users?id=' + userId, headers=headers)
                userLogo = stream.json()['data'][0]['profile_image_url']
                stream = requests.get('https://api.twitch.tv/helix/chat/emotes/global?id=25', headers=headers)
            
            # Create dictionary (object)
            twitch_dict = {'Type':'Message','Logo':userLogo,'User': displayName, 'ChatMessage': Message, 'TTSMessage': displayName+' '+e.arguments[0]}
        
            # Convert dictionary to Json object
            json_dict = json.dumps(twitch_dict)

            # Print in console and flush to send it to frontend
            print(json_dict, flush=True)

        # If a chat message starts with an exclamation point, try to run it as a command
        if e.arguments[0][:1] == '!':
            cmd = e.arguments[0].split(' ')[0][1:]

            message = 'cmd: ' + cmd
            consoleMessage_dict = {'Type':'None','Message':message}
            json_dict = json.dumps(consoleMessage_dict)
            print(json_dict, flush=True)
            self.do_command(e, cmd)
        return
    
    def do_command(self, e, cmd):
        c = self.connection
        # Poll the API to get current game.
        if cmd == "game":
            url = 'https://api.twitch.tv/kraken/channels/' + self.channel_id
            headers = {'Client-ID': self.client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}
            r = requests.get(url, headers=headers).json()
            c.privmsg(self.channel, r['display_name'] + ' is currently playing ' + r['game'])

        # Poll the API the get the current status of the stream
        elif cmd == "title":
            url = 'https://api.twitch.tv/kraken/channels/' + self.channel_id
            headers = {'Client-ID': self.client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}
            r = requests.get(url, headers=headers).json()
            c.privmsg(self.channel, r['display_name'] + ' channel title is currently ' + r['status'])

        # Provide basic information to viewers for specific commands
            message = "This is an example bot, replace this text with your raffle text."
            c.privmsg(self.channel, message)
        elif cmd == "schedule":
            message = "This is an example bot, replace this text with your schedule text."            
            c.privmsg(self.channel, message)

    def main():
            username  = sys.argv[1]
            client_id = sys.argv[2]
            token     = sys.argv[3]
            channel   = sys.argv[4]
        
if __name__ == "__main__":
    input_thread = threading.Thread(target=get_user_input)
    input_thread.start()
    bot = TwitchBot()
    bot.start()
