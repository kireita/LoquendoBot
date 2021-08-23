import sched, time
import requests
import json
import sys

s = sched.scheduler(time.time, time.sleep)
def do_something(sc): 
    response = requests.get('https://tmi.twitch.tv/group/user/kireita/chatters')
    json_response = response.json()
    repository = json_response['chatters']

    twitch_dict = {'viewers':repository}
    
    json_dict = json.dumps(twitch_dict)
    print(json_dict)

    sys.stdout.flush()
    # do your stuff
    s.enter(60, 1, do_something, (sc,))

s.enter(60, 1, do_something, (s,))
s.run()