 
# from twitchio.dataclasses import Context
# from twitchio.ext import commands
# from twitchio.client import Client
# import sys
# import json
# import datetime
# import requests

# # Twitch headers
# headers = {
#     'Client-ID': "aiqb5jl2gklqggdipt7kvw1yhlnwtv",
#     'Accept': 'application/vnd.twitchtv.v5+json'
# }

# client = Client(
#     client_id="aiqb5jl2gklqggdipt7kvw1yhlnwtv",
#     client_secret="yqfgn3tk40wh3nosk55r39yx8xbugh",
# )
# def main():
#     response = requests.get('https://api.twitch.tv/kraken/chat/emoticons', headers = headers)
#     json_response = response.json()
#     jsonString = json.dumps(json_response)
#     jsonFile = open("data.json", "w")
#     jsonFile.write(jsonString)
#     jsonFile.close()
#     print(json_response)
    
# main()

# import sys, irc.bot, requests


# class TwitchBot(irc.bot.SingleServerIRCBot):
#     def __init__(self, username, client_id, token, channel):
#         self.client_id = client_id
#         self.token = token
#         self.channel = '#' + channel

#         # Get the channel id, we will need this for v5 API calls
#         url = 'https://api.twitch.tv/kraken/users?login=' + 'kireita'
#         headers = {'Client-ID': 'aiqb5jl2gklqggdipt7kvw1yhlnwtv', 'Accept': 'application/vnd.twitchtv.v5+json',
#                    'Authorization': 'oauth:' + token}
#         r = requests.get(url, headers=headers).json()
#         self.channel_id = r['users'][0]['_id']

#         # Create IRC bot connection
#         server = 'irc.chat.twitch.tv'
#         port = 6667
#         print('Connecting to ' + server + ' on port ' + str(port) + '...')
#         irc.bot.SingleServerIRCBot.__init__(self, [(server, port, 'oauth:' + token)], 'kireita', 'kireita')

#     def on_welcome(self, c, e):
#         print('Joining ' + self.channel)

#         # You must request specific capabilities before you can use them
#         c.cap('REQ', ':twitch.tv/membership')
#         c.cap('REQ', ':twitch.tv/tags')
#         c.cap('REQ', ':twitch.tv/commands')
#         c.join(self.channel)
#         print('Joined ' + self.channel)
#         c.privmsg(self.channel, "Connected!")

#     def on_pubmsg(self, c, e):

#         # If a chat message starts with an exclamation point, try to run it as a command
#         if e.arguments[0][:1] == '!':
#             cmd = e.arguments[0].split(' ')[0][1:]
#             print('Received command: ' + cmd)
#             self.do_command(e, cmd)
#         return

#     def do_command(self, e, cmd):
#         c = self.connection

#         # Poll the API to get current game.
#         if cmd == "game":
#             url = 'https://api.twitch.tv/kraken/channels/' + self.channel_id
#             headers = {'Client-ID': self.client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}
#             r = requests.get(url, headers=headers).json()
#             c.privmsg(self.channel, str(r['display_name']) + ' is currently playing ' + str(r['game']))

#         # Poll the API the get the current status of the stream
#         elif cmd == "title":
#             url = 'https://api.twitch.tv/kraken/channels/' + self.channel_id
#             headers = {'Client-ID': self.client_id, 'Accept': 'application/vnd.twitchtv.v5+json'}
#             r = requests.get(url, headers=headers).json()
#             c.privmsg(self.channel, str(r['display_name']) + ' channel title is currently ' + str(r['status']))

#         # Provide basic information to viewers for specific commands
#         elif cmd == "raffle":
#             message = "This is an example bot, replace this text with your raffle text."
#             c.privmsg(self.channel, message)
#         elif cmd == "schedule":
#             message = "This is an example bot, replace this text with your schedule text."
#             c.privmsg(self.channel, message)

#         # The command was not recognized
#         else:
#             c.privmsg(self.channel, "Did not understand command: " + cmd)


# def main():
#     if len(sys.argv) != 5:
#         print('Usage: twitchbot <username> <client id> <token> <channel>')
#         sys.exit(1)

#     username = sys.argv[1]
#     client_id = sys.argv[2]
#     token = sys.argv[3]
#     channel = sys.argv[4]

#     bot = TwitchBot(username, client_id, token, channel)
#     bot.start()


# if __name__ == "__main__":
#     main()