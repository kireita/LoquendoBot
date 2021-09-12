'''
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
'''

import sys
import irc.bot
import requests
import json
import threading
import datetime
from py_linq import Enumerable

import time


MinRange=0
MaxRange=0
EmoteList=['']
EmoteRangeList=['']
CurrentMessage=""

# def isItOnAnEmoteRange(CurrentMessagePosition):
    
#     for i in EmoteRangeList:
#         if

#     if True:
#         return True
#     else:
#         return False


# #Takes the emoticon value (ex: '25:0-4') then sets MinRange and MaxRange (ex: 0 and 4)
# def getRange_SingleEmote(emoteValue):
#     #Right side is the list of ranges where the emote ID is used
#     emoteRangeSide=emoteValue.split(':')[1]
#     #Left side is the ID of the emote
#     emoteIDSide=emoteValue.split(':')[0]
#     #Entire URL of the emote
#     EmoteList.append(EmoteURLleft+emoteIDSide+EmoteURLright)
#     #If there is more than one instance of a specific emote, they're separated by commas
#     rangeInstances=emoteRangeSide.split(',')
#     #If there is only one instance of the emote, it runs once
#     #Which means this is STILL INCOMPLETE
#     for j in rangeInstances:
#         MinRange=rangeInstances.split('-')[0]
#         MaxRange=rangeInstances.split('-')[1]
#         EmoteRangeList.append(rangeInstances)

EmoteURLleft='<img class="scale" src="https://static-cdn.jtvnw.net/emoticons/v2/'
EmoteURLright='/default/dark/1.0" />'

#receives the dictionary and the word to find an emote for
#returns the same word if wasnt found
#returns the constructed URL of the emote image to show
def emote_substitution(emoteDictionary, emoteName):
    #If the word exists in the dictionary, return the ID
    emoteID=123#placeholder
    if emoteName in emoteDictionary:
        return EmoteURLleft+emoteDictionary[emoteID]+EmoteURLright
    else:
        return emoteName

#Separates the message in words by spaces
def transform_Twitch_Emotes(message, emoteDictionary):
    tempString=message.split()
    transformedMessage=""
    for x in tempString:
        transformedMessage+=emote_substitution(emoteDictionary, message)
        transformedMessage+=" "

# spawn a new thread to wait for input 
def get_user_input():
    while True == True:
        user_input = input()
        bot.send_message(user_input)

Baneados = ['fx25v','FX25V']

# Twitch headers
client_id = 'aiqb5jl2gklqggdipt7kvw1yhlnwtv'
client_secret = 'yqfgn3tk40wh3nosk55r39yx8xbugh'
streamer_name = 'kireita'

body = {
    'client_id': client_id,
    'client_secret': client_secret,
    "grant_type": 'client_credentials'
}
r = requests.post('https://id.twitch.tv/oauth2/token', body)

#data output
keys = r.json();

headers = {
    'Client-ID': client_id,
    'Authorization': 'Bearer ' + keys['access_token']
}

class TwitchBot(irc.bot.SingleServerIRCBot):
    
    # Initialize chat
    def __init__(self,  username = 'kireita', client_id = 'aiqb5jl2gklqggdipt7kvw1yhlnwtv', token = 's9a6ga8397xqpy5n37250b6du39o0i', channel = 'kireita'):
        self.client_id = client_id
        self.token = token
        self.channel = '#' + channel

        # Get the channel id, we will need this for v5 API calls
        url = 'https://api.twitch.tv/kraken/users?login=' + channel
        headers = {'Client-ID': client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}
        r = requests.get(url, headers=headers).json()
        self.channel_id = r['users'][0]['_id']

        # Create IRC bot connection
        server = 'irc.chat.twitch.tv'
        port = 6667
        
        message = 'Connecting to ' + server + ' on port ' + str(port) + '...'
        consoleMessage_dict = {'Type':'Console','Message':message}
        json_dict = json.dumps(consoleMessage_dict)
        print (json_dict, flush=True)
        irc.bot.SingleServerIRCBot.__init__(self, [(server, port, 'oauth:'+token)], username, username)
                
        # loop = asyncio.get_event_loop()
        # loop.run_until_complete(echo())
    
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

        dct = {}

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

        # Id of sender (to get the logo later)
        userIdObject = twitchMessageObject.where(lambda x: x['key'] == 'user-id')
        userId =userIdObject[0]['value'] 

        # Get logo with User Id
        if userId != '0':
            stream = requests.get('https://api.twitch.tv/helix/users?id=' + userId, headers=headers)
            userLogo = stream.json()['data'][0]['profile_image_url']
            stream = requests.get('https://api.twitch.tv/helix/chat/emotes/global?id=25', headers=headers)
        
        # Create dictionary (object)   
        twitch_dict = {'Type':'Message','Logo':userLogo,'User': displayName, 'Message': Message}
    
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
        
        if e.arguments[0][:1] != '!':
            msg = e.arguments[0]
            message = 'msg: ' + msg
            consoleMessage_dict = {'Type':'None','Message':message}
            json_dict = json.dumps(consoleMessage_dict)
            print (json_dict, flush=True)
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

        # The command was not recognized
        # else:
            # c.privmsg(self.channel, "Did not understand command: " + cmd)

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