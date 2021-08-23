'''
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
'''

import sys
import irc.bot
import requests
import threading
import time

# spawn a new thread to wait for input 
def get_user_input():
    while True == True:
        user_input = input()
        bot.send_message(user_input)

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
        print ('Connecting to ' + server + ' on port ' + str(port) + '...')
        irc.bot.SingleServerIRCBot.__init__(self, [(server, port, 'oauth:'+token)], username, username)
                
        # loop = asyncio.get_event_loop()
        # loop.run_until_complete(echo())
        
    def on_welcome(self, c, e):
        print('Joining ' + self.channel)

        # You must request specific capabilities before you can use them
        c.cap('REQ', ':twitch.tv/membership')
        c.cap('REQ', ':twitch.tv/tags')
        c.cap('REQ', ':twitch.tv/commands')
        c.join(self.channel)
        
    def send_message(self,msg):
        c = self.connection
        print('StreamerMsg: ' + msg + "\n")
        c.privmsg(self.channel, msg)

    def on_pubmsg(self, c, e):

        dct = {}
        
        # Message
        Message = e.arguments[0]
        
        # User Id
        dct = e.tags[12]
        UserId = dct['value']
        
        # Get logo with User Id
        if UserId != '0':
            stream = requests.get('https://api.twitch.tv/helix/users?id=' + UserId, headers=headers)
            UserLogo = stream.json()['data'][0]['profile_image_url']
            stream = requests.get('https://api.twitch.tv/helix/chat/emotes/global?id=25', headers=headers)
            lol = stream.json()
                    
        # Display Name
        dct = e.tags[3]
        DisplayName = dct['value']
        
        # Emoticons
        dct = e.tags[4]
        emoticons = dct['value']
        if emoticons is not None:
            emoticons_list = emoticons.split(",")
            
        # Badges
        dct = e.tags[1]
        badges = dct['value']
        if badges is not None:
            badges_list = badges.split(",")

        # If a chat message starts with an exclamation point, try to run it as a command
        if e.arguments[0][:1] == '!':
            cmd = e.arguments[0].split(' ')[0][1:]

            print('cmd: ' + cmd)
            self.do_command(e, cmd)
        
    
        if e.arguments[0][:1] != '!':
            msg = e.arguments[0]
            
            print ('msg: ' + msg)
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



