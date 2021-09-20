import os
import requests
import json
import threading
import re
import sys
import json
import requests
from bs4 import BeautifulSoup
from pytchat import LiveChatAsync
import asyncio
from dotenv import dotenv_values
from configparser import ConfigParser
import pytchat

# Read config file
config = ConfigParser()
config.read('././config/settings.ini')

# Read Environment variables from .env file
envVariables = {
    **dotenv_values("././.env"),  # load shared development variables
}

YOUTUBE_API_KEY = os.environ["YOUTUBEAPIKEY"]
if YOUTUBE_API_KEY !='':
    consoleMessage_dict = {'Type':'Console','Message':"YOUTUBE_API_KEY: confirmed"}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)
    
if YOUTUBE_API_KEY is not None:
    api_key = YOUTUBE_API_KEY
elif config['YOUTUBE']['YOUTUBE_API_KEY'] != '':
    api_key = config['YOUTUBE']['YOUTUBE_API_KEY']
else:
    api_key = envVariables["YOUTUBE_API_KEY"]

channel_id = config['YOUTUBE']['CHANNEL_ID']
use_youtube_api_key = config['YOUTUBE']['USE_YOUTUBE_API_KEY']

# Header needs to be send in order to get response
headers = {
    'Accept-Language': 'en-US,en;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0',
}

# Cookie needs to be send in order to get response
cookies={
    'CONSENT': 'YES+42'
}

# Send request to youtube with headers and cookies
def get(url: str):
    try:
        r = requests.get(url, headers=headers,cookies=cookies)
        return r.text
    except requests.RequestException:
        pass

def get_livestream_id_with_YouTube_API_KEY(channel_id : str):
    
    base_url = "https://www.googleapis.com/youtube/v3/search?"
    
    params = {
        "part" : "snippet",
        "channelId" : channel_id,
        "eventType" : "live",
        "type" : "video",
        "key" : api_key
    }

    r = requests.get(base_url, params=params)
    rr = json.loads(r.content)
    video_id = rr['items'][0]['id']['videoId']

    return video_id

def get_livestream_id_without_Youtube_API_KEY(channel_id: str):
    # Parse the html to get the livestream_id
    def get_live_video_info_from_html(html: str):
        # Analyze the obtained html
        soup = BeautifulSoup(html)
        
        # Get the link that has 'canonical' as relation, this is the livestream redirect link
        livestream_link = soup.find_all('link', {'href': True, 'rel': 'canonical'})
        
        if len(livestream_link) > 0:
            for item in livestream_link:
                consoleMessage_dict = {'Type':'Console','Message':item['href']}
                json_dict = json.dumps(consoleMessage_dict)
                print (json_dict, flush=True)
                return get_livestream_id(item['href'])
        else:
            consoleMessage_dict = {'Type':'Console','Message':"Could not obtain stream links"}
            json_dict = json.dumps(consoleMessage_dict)
            print (json_dict, flush=True)
                
    # Extract the livestream_id with regular expression
    def get_livestream_id(item: str):
        livestream_item = re.search(r'([^\=]+$)',item)
        livestream_id =livestream_item.group(0)
        return livestream_id

    # Check if streamer is live by going to his 'live' page, this will contain elements where we can identify if the channel is live or not
    def check_channel_live_streaming(channel_id: str):
        try:
            # send request and get the html
            html = get('https://www.youtube.com/channel/'+channel_id+'/live')
            
            # If html has the substring it means that the channel is live
            if '"label":"LIVE NOW"' in html:
                video_info = get_live_video_info_from_html(html)
                return video_info
            else:
                return False
        except Exception:
            raise
        
    return check_channel_live_streaming(channel_id)

# Parse the html to get the livestream_id
def get_user_avatar(user_id: str):
    html = get('https://www.youtube.com/channel/'+user_id)
    # Analyze the obtained html
    soup = BeautifulSoup(html)
    
    # Get the link that has 'thumbnailUrl' as itemprop, this is user's avatar
    avatar_link = soup.find_all('link', {'href': True, 'itemprop': 'thumbnailUrl'})
    
    if len(avatar_link) > 0:
        for item in avatar_link:
            return item['href']
    else:
        consoleMessage_dict = {'Type':'Console','Message':"Could not obtain user avatar"}
        json_dict = json.dumps(consoleMessage_dict)
        print (json_dict, flush=True)

def start_youtube():
    if use_youtube_api_key == "0":
        video_id = get_livestream_id_without_Youtube_API_KEY(channel_id)
        consoleMessage_dict = {'Type':'Console','Message':"0 - video_id: "+str(video_id)}
        json_dict = json.dumps(consoleMessage_dict)
        print (json_dict, flush=True)
    else:
        video_id = get_livestream_id_with_YouTube_API_KEY()
        consoleMessage_dict = {'Type':'Console','Message':"1 - video_id: "+str(video_id)}
        json_dict = json.dumps(consoleMessage_dict)
        print (json_dict, flush=True)
        
    consoleMessage_dict = {'Type':'Console','Message':"video_id: "+str(video_id)}
    json_dict = json.dumps(consoleMessage_dict)
    print (json_dict, flush=True)

    chat = pytchat.create(video_id=video_id)
    while chat.is_alive():
        for c in chat.get().sync_items():
            
            if re.match(r'\[Twitch:(.*?)\]', c.message):
                continue
            # Create dictionary (object)
            twitch_dict = {'Type':'Message','Logo':get_user_avatar(c.author.channelId),'User': c.author.name, 'Message': c.message}
            
            # Convert dictionary to Json object
            json_dict = json.dumps(twitch_dict)

            # Print in console and flush to send it to frontend
            print(json_dict, flush=True)

start_youtube()

# TODO // Send message to YouTube chat 