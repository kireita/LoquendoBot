let { PythonShell } = require('python-shell'),
    moment = require('moment-timezone')

const path = require('path'),
    { ipcRenderer } = require('electron'),
    Say = require('say').Say,
    Notice = require("@ouduidui/notice"),
    notice = new Notice()

var say = new Say(),
    fs = require('fs'),
    ini = require('ini'),
    xxx = require("./js/voiceQueue"),
    lul = require("./js/checkForPython"),
    speechSynthesis = require('speech-synthesis'), // Voices from browser
    config = ini.parse(fs.readFileSync('./config/Settings.ini', 'utf-8')) // Read Config file

var noticeOptions = {
    type: 'line',
    title: 'Installing Python requirements',
    color: '#333',
    backgroundColor: 'rgba(255,255,255,.6)',
    fontSize: 14
}

var optionsTwitch = {
    scriptPath: path.join(__dirname, '/python/Twitch/'),
    //pythonPath: path.join(__dirname, '/.venv/Scripts/python.exe')
}

var optionsYoutube = {
    scriptPath: path.join(__dirname, '/python/Youtube/'),
    //pythonPath: path.join(__dirname, '/.venv/Scripts/python.exe')
}

let twitchViewerList = new PythonShell('twitchViewerList.py', optionsTwitch);
let twitch = new PythonShell('twitch.py', optionsTwitch);
let youtube = new PythonShell('youtube.py', optionsYoutube);

// TODO: make sounds configurable per channel 
const player = new Audio('./sounds/alert.mp3');

// Check installed voices
say.getInstalledVoices((err, voices) => {
    // Loop through each of the voices.
    voices.forEach(function(voice, i) {
        // Create a new option element.
        var option = document.createElement('option');
        // Set the options value and text.
        option.value = i;
        option.innerHTML = voice;

        // Add the option to the voice selector.
        voiceSelect.appendChild(option);
    });
});

var voiceSelect = document.getElementById('voice');

// xxx.add('lul', 'Microsoft David Desktop');

if (config.SETTINGS.HAS_PYTHON_INSTALLED === '0') {

    notice.showLoading(noticeOptions);

    lul.CheckForPython()
} else {
    // List of Twitch viewer
    twitchViewerList.on('message', function(message) {
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
        // TODO: notification message when no key is given.

        if (JSON.parse(message).Type === "Message") {

            var t = document.getElementById("voice");
            var selectedVoice = t.options[t.selectedIndex].text;

            // TODO: make TTS Dynamic
            // say.speak(JSON.parse(message).Message, 'Vocalizer Expressive Jorge Harpo 22kHz', 1);
            sayQueue.add(JSON.parse(message).TTSMessage, selectedVoice);

            userHtml = `
        <article class="msg-container msg-remote" id="msg-0">
            <div class="msg-box">
            <div class="icon-container">
            <img class="user-img" id="user-0" src="` + JSON.parse(message).Logo + `" />
            <img class="status-circle" id="user-0" src="./images/twitch-icon.png" />
        </div>
                <div class="flr">
                    <div class="messages">
                    <span class="timestamp"><span class="username">` + JSON.parse(message).User + `</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
                    <br>
                        <p class="msg" id="msg-0">
                        ` + JSON.parse(message).ChatMessage + `
                        </p>
                    </div>

                </div>
            </div>
        </article>`;
        }

        if (JSON.parse(message).Type === "Console") {
            // Create chat message from recieved data
            userHtml = `
        <article class="msg-container msg-remote" id="msg-0">
            <div class="msg-box">
                <div class="flr">
                    <div class="messages">
                            <p class="msg" id="msg-0">
                            ` + JSON.parse(message).Message + ` 
                            </p>
                    </div>
                </div>
            </div>
        </article>`;
        }

        // Appends the message to the main chat box (shows the message)
        $("#chatbox").append(userHtml);

        // Auto-scrolls the window to the last recieved message
        let [lastMsg] = $('.msg-container').last();
        lastMsg.scrollIntoView({ behavior: 'smooth' });
    });

    // Recieve Twitch chat messages
    youtube.on('message', function(message) {
        // TODO: notification message when no key is given.

        player.play();

        if (JSON.parse(message).Type === "Message") {

            var t = document.getElementById("voice");
            var selectedVoice = t.options[t.selectedIndex].text;

            // TODO: make TTS Dynamic
            // say.speak(JSON.parse(message).Message, 'Vocalizer Expressive Jorge Harpo 22kHz', 1);
            sayQueue.add(JSON.parse(message).Message, selectedVoice);

            userHtml = `
        <article class="msg-container msg-remote" id="msg-0">
            <div class="msg-box">
            <div class="icon-container">
            <img class="user-img" id="user-0" src="` + JSON.parse(message).Logo + `" />
            <img class="status-circle" id="user-0" src="./images/youtube-icon.png" />
        </div>
                <div class="flr">
                    <div class="messages">
                    <span class="timestamp"><span class="username">` + JSON.parse(message).User + `</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
                    <br>
                        <p class="msg" id="msg-0">
                        ` + JSON.parse(message).Message + `
                        </p>
                    </div>

                </div>
            </div>
        </article>`;
        }

        if (JSON.parse(message).Type === "Console") {
            // Create chat message from recieved data
            userHtml = `
        <article class="msg-container msg-remote" id="msg-0">
            <div class="msg-box">
                <div class="flr">
                    <div class="messages">
                            <p class="msg" id="msg-0">
                            ` + JSON.parse(message).Message + ` 
                            </p>
                    </div>
                </div>
            </div>
        </article>`;
        }

        // Appends the message to the main chat box (shows the message)
        $("#chatbox").append(userHtml);

        // Auto-scrolls the window to the last recieved message
        let [lastMsg] = $('.msg-container').last();
        lastMsg.scrollIntoView({ behavior: 'smooth' });
    });
}