const path = require('path'), // get directory path
    electron = { ipcRenderer, BrowserWindow } = require('electron'), // necesary electron libraries to send data to the app
    Say = require('say').Say, // tts engine
    Notice = require("@ouduidui/notice"), // notification engine
    notice = new Notice(), // notification
    soundsFolder = path.join(__dirname, '/sounds/'), // sound folder location
    selectedNotificationSound = new Audio(); // sound object to reproduce notifications

var say = new Say(),
    fs = require('fs'), // file system library
    ini = require('ini'), // configuration settings library
    lul = require("./js/checkForPython"), // python script
    speechSynthesis = require('speech-synthesis'), // Voices from browser
    config = ini.parse(fs.readFileSync(path.join(__dirname, '/config/settings.ini'), 'utf-8')), // Read Config file
    resolutions = fs.readFileSync(path.join(__dirname, '/config/resolutions.txt')).toString().split("\r\n"), // read resolution file
    encodings = fs.readFileSync(path.join(__dirname, '/config/encodings.txt')).toString().split("\r\n"), // read encoding file
    resolutionSelect = document.getElementById('resolution'), // obtain the html reference of the resolutions combobox
    encodingSelect = document.getElementById('encoding'), // obtain the html reference of the encodings combobox
    installedTTS = document.getElementById("installedTTS"), // obtain the html reference of the installedTTS combobox
    sound = document.getElementById("notification"), // obtain the html reference of the sound combobox
    selectedVoiceIndex,
    selectedEncodingIndex,
    TTSVolume = 1,
    isPlaying = false,
    notificationSoundVolume = 1,
    optionsTwitch = {
        scriptPath: path.join(__dirname, '/python/Twitch/')
    },
    optionsYoutube = { // youtube python script options
        scriptPath: path.join(__dirname, '/python/Youtube/')
    },
    noticeOptions = { // twitch python script options
        type: 'line',
        title: 'Installing Python requirements',
        color: '#333',
        backgroundColor: 'rgba(255,255,255,.6)',
        fontSize: 14
    };

let { PythonShell } = require('python-shell'),
    moment = require('moment-timezone'),
    twitchViewerList = new PythonShell('twitchViewerList.py', optionsTwitch),
    twitch = new PythonShell('twitch.py', optionsTwitch),
    youtube = new PythonShell('youtube.py', optionsYoutube);

// TODO: make sounds configurable per channel 


// On video playing toggle values
selectedNotificationSound.onplaying = function() {
    isPlaying = true;
};

// On video pause toggle values
selectedNotificationSound.onpause = function() {
    isPlaying = false;
};

// Play sound function
function playSound() {
    if (selectedNotificationSound.paused && !isPlaying) {
        selectedNotificationSound.src = './sounds/' + sound.options[config.SETTINGS.NOTIFICATION_SOUND].text;
        selectedNotificationSound.volume = notificationSoundVolume;
        selectedNotificationSound.play();
    }
}

// Pause sound function
function pauseSound() {
    if (!selectedNotificationSound.paused && isPlaying) {
        selectedNotificationSound.pause();
    }
}

function playVoice(message) {
    selectedVoiceIndex = installedTTS.options[installedTTS.selectedIndex].text;
    selectedEncodingIndex = encodingSelect.options[config.SETTINGS.ENCODING].text;
    sayQueue.add(JSON.parse(message).TTSMessage, selectedVoiceIndex, selectedEncodingIndex);
}

// Check for installed sounds
fs.readdir(soundsFolder, (err, files) => {
    files.forEach(function(file, i) {

        // Create a new option element.
        var option = document.createElement('option');

        // Set the options value and text.
        option.value = i;
        option.innerHTML = file;

        // Add the option to the sound selector.
        sound.appendChild(option);
    });

    // set the saved notification sound
    sound.selectedIndex = config.SETTINGS.NOTIFICATION_SOUND;

    // set the saved volume in the app (visual)
    document.getElementById('SoundVolume').innerText = config.SETTINGS.NOTIFICATION_VOLUME + "%";

    //set the saved volume for when the sound plays (data)
    notificationSoundVolume = parseInt(document.getElementById('SoundVolume').innerText) / 100;

    //set the slider and button to the saved volume
    slider.value = config.SETTINGS.NOTIFICATION_VOLUME;
    setBar();
});

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
        installedTTS.appendChild(option);
    });
    installedTTS.selectedIndex = config.SETTINGS.VOICE;
});

// Check for installed resolutions
(() => {
    for (i in resolutions) {

        // Create a new option element.
        var option = document.createElement('option');

        // Set the options value and text.
        option.value = i;
        option.innerHTML = resolutions[i];

        // Add the option to the sound selector.
        resolutionSelect.appendChild(option);
    };
    resolutionSelect.selectedIndex = config.SETTINGS.RESOLUTION;
    var string = resolutionSelect.options[config.SETTINGS.RESOLUTION].text;
    var numbers = string.match(/\d+/g).map(Number);
    ipcRenderer.send('resize-window', numbers[0], numbers[1]);
})();

// Check for installed encodings
(() => {
    for (i in encodings) {

        // Create a new option element.
        var option = document.createElement('option');

        // Set the options value and text.
        option.value = i;
        option.innerHTML = encodings[i];

        // Add the option to the sound selector.
        encodingSelect.appendChild(option);
    };
    encodingSelect.selectedIndex = config.SETTINGS.ENCODING;
})();

// Set Advanced settings
(() => {

    // Twitch settings
    document.getElementById('CLIENT_ID').value = config.TWITCH.CLIENT_ID;
    document.getElementById('CLIENT_SECRET').value = config.TWITCH.CLIENT_SECRET;
    document.getElementById('OAUTH_TOKEN').value = config.TWITCH.OAUTH_TOKEN;
    document.getElementById('TWITCH_CHANNEL_NAME').value = config.TWITCH.CHANNEL_NAME;
    document.getElementById('USERNAME').value = config.TWITCH.USERNAME;

    // Youtube settings
    document.getElementById('YOUTUBE_KEY').value = config.YOUTUBE.YOUTUBE_KEY;
    document.getElementById('CHANNEL_ID').value = config.YOUTUBE.CHANNEL_ID;
    document.getElementById('YOUTUBE_CHANNEL_NAME').value = config.YOUTUBE.CHANNEL_NAME;
    document.getElementById('USE_YOUTUBE_API_KEY').checked = config.YOUTUBE.USE_YOUTUBE_API_KEY == true ? 1 : 0;

    //Facebook settings
    document.getElementById('ACCESS_TOKEN').value = config.FACEBOOK.ACCESS_TOKEN;
    document.getElementById('FACEBOOK_PAGE').value = config.FACEBOOK.FACEBOOK_PAGE;
})();

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

    // Receive Twitch chat messages
    twitch.on('message', function(message) {
        // TODO: notification message when no key is given.

        playSound()

        if (JSON.parse(message).Type === "Message") {

            playVoice(message);

            // TODO: Sanitize HTML in backend (to prevent remote code injection)
            let newStr = JSON.parse(message).ChatMessage;
            let ccc = newStr.replace(/&/g, '&amp;');
            ccc = ccc.replace(/>/g, '&gt;');
            ccc = ccc.replace(/</g, "&lt;");
            ccc = ccc.replace(/"/g, '&quot;');

            userHtml = `
                <article class="msg-container msg-remote" id="msg-0">
                    <div class="mmg">
                        <div class="icon-container">
                            <img class="user-img" id="user-0" src="` + JSON.parse(message).Logo + `" />
                            <img class="status-circle" id="user-0" src="./images/twitch-icon.png" />
                        </div>
                        <div class="msg-box">
                            <div class="flr">
                                <div class="messages">
                                    <div class="lalapalooza">
                                        <span class="timestamp">
                                            <span class="username">` + JSON.parse(message).User + `</span>
                                            <span class="posttime">` + moment().format('hh:mm A') + `</span>
                                        </span>
                                    </div>
                                    <br>
                                    <p class="msg" id="msg-0">
                                    ` + ccc + `
                                    </p>
                                </div>
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
        $("#chatBox").append(userHtml);

        // Auto-scrolls the window to the last recieved message
        let [lastMsg] = $('.msg-container').last();
        lastMsg.scrollIntoView({ behavior: 'smooth' });
    });

    // Receive Twitch chat messages
    youtube.on('message', function(message) {
        // TODO: notification message when no key is given.

        playSound();

        if (JSON.parse(message).Type === "Message") {

            playVoice(message);

            userHtml = `
                <article class="msg-container msg-remote" id="msg-0">
                    <div class="mmg">
                        <div class="icon-container">
                            <img class="user-img" id="user-0" src="` + JSON.parse(message).Logo + `" />
                            <img class="status-circle" id="user-0" src="./images/youtube-icon.png" />
                        </div>
                        <div class="msg-box">
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
                    </div>
                </article>`;
        }

        if (JSON.parse(message).Type === "Console") {

            // Create chat message from received data
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
        $("#chatBox").append(userHtml);

        // Auto-scrolls the window to the last received message
        let [lastMsg] = $('.msg-container').last();
        lastMsg.scrollIntoView({ behavior: 'smooth' });
    });
}

//TODO: Theme switcher: https://www.studytonight.com/post/build-a-theme-switcher-for-your-website-with-javascript 
//TODO: different load screen for python install: https://loading.io/css/
//TODO: different notifications for python install: https://speckyboy.com/css-js-notification-alert-code/