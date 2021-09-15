import sched, time
import requests
import json
import sys

s = sched.scheduler(time.time, time.sleep)
def do_something(sc): 
    
    # TODO: Twitch viewer count
    # TODO: Youtube viewer count
    # TODO: Facebook viewer count
    
    # response = requests.get('https://tmi.twitch.tv/group/user/kireita/chatters')
    # json_response = response.json()
    # repository = json_response['chatters']

    # twitch_dict = {'viewers':repository}
    
    # json_dict = json.dumps(twitch_dict)
    
    # To send the object to JS the following 2 lines need to be placed
    print(json_dict)
    sys.stdout.flush()

    # do your stuff
    s.enter(60, 1, do_something, (sc,))

s.enter(60, 1, do_something, (s,))
s.run()