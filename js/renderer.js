//var ps = require("python-shell")
let { PythonShell } = require('python-shell')
let moment = require('moment-timezone')
let play = require('audio-play');
let load = require('audio-loader');

let twitchViewerList = new PythonShell('python/Twitch/twitchViewerList.py');
// let twitch = new PythonShell('python/Twitch/twitch.py', null, );
let twitch = new PythonShell('python/test.py');

// List of Twitch viewer
twitchViewerList.on('message', function(message) {

    console.log(message);

    var json_obj = JSON.parse(message);

    getTwitchModerators(json_obj);
    getTwitchViewers(json_obj);
})

function getTwitchViewers(json_obj) {
    let viewerlist = document.getElementById("viewers");

    // Remove current list of viewers
    if (viewerlist) {
        while (viewerlist.firstChild) {
            viewerlist.removeChild(viewerlist.firstChild);
        }
    }

    // Print list of current viewers
    let viewers = json_obj.viewers.viewers;
    if (viewers.length > 0) {
        for (var i = 0; i < viewers.length; i++) {
            var li = document.createElement("li");
            li.innerText = viewers[i];
            viewerlist.appendChild(li);
        }
    }
}

function getTwitchModerators(json_obj) {
    let viewerlist = document.getElementById("moderators");

    // Remove current list of moderators
    if (viewerlist) {
        while (viewerlist.firstChild) {
            viewerlist.removeChild(viewerlist.firstChild);
        }
    }

    // Print list of current moderators
    let viewers = json_obj.viewers.moderators;
    if (viewers.length > 0) {
        for (var i = 0; i < viewers.length; i++) {
            var li = document.createElement("li");
            li.innerText = viewers[i];
            viewerlist.appendChild(li);
        }
    }
}

// Recieve Twitch chat messages
twitch.on('message', function(message) {

    console.log(message);

    load('sounds/alert.mp3').then(play);

    // Create chat message from recieved data
    let userHtml = `
                <article class="msg-container msg-remote" id="msg-0">
                    <div class="msg-box">
                    <div class="icon-container">
                    <img class="user-img" id="user-0" src="` + JSON.parse(message).Logo + `" />
                    <img class="status-circle" id="user-0" src="./images/twitch-icon.png" />
                </div>
                        <div class="flr">
                            <div class="messages">
                            <span class="timestamp"><span class="username">` + JSON.parse(message).User + `</span><span class="posttime">` + moment().format('hh:mm') + `</span></span>
                            <br>
                                <p class="msg" id="msg-0">
                                ` + JSON.parse(message).Message + ` <img class="scale" src="https://static-cdn.jtvnw.net/emoticons/v2/191313/default/dark/1.0" />
                                </p>
                            </div>

                        </div>
                    </div>
                </article>`;

    // Appends the message to the main chat box (shows the message)
    $("#chatbox").append(userHtml);

    // Auto-scrolls the window to the last recieved message
    let [lastMsg] = $('.msg-container').last();
    lastMsg.scrollIntoView({ behavior: 'smooth' });

});