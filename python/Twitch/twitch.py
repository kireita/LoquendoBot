from twitchio.dataclasses import Context
from twitchio.ext import commands
from twitchio.client import Client
import sys
import json
import datetime
import requests

Baneados = ['fx25v','FX25V']

# Twitch headers
headers = {
    'Client-ID': "aiqb5jl2gklqggdipt7kvw1yhlnwtv",
    'Accept': 'application/vnd.twitchtv.v5+json'
}

# Bot credentials
app = commands.Bot(
    irc_token="oauth:s9a6ga8397xqpy5n37250b6du39o0i",
    client_id="aiqb5jl2gklqggdipt7kvw1yhlnwtv",
    nick='kireita',
    prefix='!',
    initial_channels=["#kireita"],
)

client = Client(
    client_id="aiqb5jl2gklqggdipt7kvw1yhlnwtv",
    client_secret="yqfgn3tk40wh3nosk55r39yx8xbugh",
)

# Converts date to ISO format
def default(obj):  
    if isinstance(obj, (datetime.date, datetime.datetime)):
        return obj.isoformat()

# Recieve chat message event
@app.event
async def event_message(ctx):
    dct = {}
    for y in [x for x in ctx.raw_data.split(';')]:
        key, value = y.split('=')
        dct[key] = value

    if dct['user-id'] not in Baneados:
        user_id = dct['user-id']
        conn = requests.get('https://api.twitch.tv/kraken/users/{}'.format(user_id), headers = headers)
    
        twitch_dict = {'Logo':conn.json()['logo'],'Channel': 'Twitch',
            'User': ctx.author.name, 'Message': ctx.content, 'Time': ctx.timestamp}
    
        json_dict = json.dumps(twitch_dict, default=default)
        print(json_dict)
        sys.stdout.flush()
    
    
@app.command(name='who')
async def get_chatters(ctx):
    chatters = await client.get_chatters('kireita')
    all_chatters = ' '.join(chatters.all)
    print(all_chatters)
    await ctx.send(f"In chat: {all_chatters}")
    
# def main():
#     while True:
#         command = sys.stdin.readline()
#         command = command.split('\n')[0]
#         print(command)
#         if command == "hello":
#             sys.stdout.write("You said hello!\n")
#         elif command == "goodbye":
#             sys.stdout.write("You said goodbye!\n")
#         else:
#             sys.stdout.write("Sorry, I didn't understand that.\n")
#         sys.stdout.flush()

#main()
app.run()
