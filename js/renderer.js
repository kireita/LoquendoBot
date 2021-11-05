window.$ = window.jQuery = require('jquery');

const path = require('path'), // get directory path
    { remote, shell, ipcRenderer, BrowserWindow } = require('electron'), // necesary electron libraries to send data to the app
    Say = require('say').Say, // tts engine
    soundsFolder = path.join(__dirname, '/sounds/'), // sound folder location
    selectedNotificationSound = new Audio(), // sound object to reproduce notifications
    fs = require('fs'), // file system library
    notification_toasts = document.getElementById("toasts"), // toeast messages
    { PythonShell } = require('python-shell'),
    moment = require('moment-timezone'),
    util = require('util'),
    exec = util.promisify(require('child_process').exec),
    talk = require("./js/voiceQueue"), // Voice queue system
    pythonScript = require("./js/CheckForPython"), // Python install script
    root = document.documentElement;

var say = new Say(),
    ini = require('ini'), // configuration settings library
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
    talk.add(JSON.parse(message).TTSMessage, selectedVoiceIndex, selectedEncodingIndex);
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

    // Theme
    document.getElementById('MAIN_COLOR_1').value = config.THEME.MAIN_COLOR_1
    var x = document.getElementById("MAIN_COLOR_1").value
    root.style.setProperty('--main-color1', x);

    document.getElementById('MAIN_COLOR_2').value = config.THEME.MAIN_COLOR_2
    var x = document.getElementById("MAIN_COLOR_2").value
    root.style.setProperty('--main-color2', x);

    document.getElementById('MAIN_COLOR_3').value = config.THEME.MAIN_COLOR_3
    var x = document.getElementById("MAIN_COLOR_3").value
    root.style.setProperty('--main-color3', x);

    document.getElementById('MAIN_COLOR_4').value = config.THEME.MAIN_COLOR_4
    var x = document.getElementById("MAIN_COLOR_4").value
    root.style.setProperty('--main-color4', x);

    document.getElementById('TOP_BAR').value = config.THEME.TOP_BAR
    var x = document.getElementById("TOP_BAR").value
    root.style.setProperty('--top-bar', x);

    document.getElementById('MID_SECTION').value = config.THEME.MID_SECTION
    var x = document.getElementById("MID_SECTION").value
    root.style.setProperty('--mid-section', x);

    document.getElementById('CHAT_BUBBLE_BG').value = config.THEME.CHAT_BUBBLE_BG
    var x = document.getElementById("CHAT_BUBBLE_BG").value
    root.style.setProperty('--chat-bubble', x);

    document.getElementById('CHAT_BUBBLE_HEADER').value = config.THEME.CHAT_BUBBLE_HEADER
    var x = document.getElementById("CHAT_BUBBLE_HEADER").value
    root.style.setProperty('--chat-bubble-header', x);

    document.getElementById('CHAT_BUBBLE_MESSAGE').value = config.THEME.CHAT_BUBBLE_MESSAGE
    var x = document.getElementById("CHAT_BUBBLE_MESSAGE").value
    root.style.setProperty('--chat-bubble-message', x);

    // Twitch settings
    document.getElementById('USE_TWITCH').checked = config.TWITCH.USE_TWITCH == true ? 1 : 0;
    document.getElementById('CLIENT_ID').value = config.TWITCH.CLIENT_ID;
    document.getElementById('CLIENT_SECRET').value = config.TWITCH.CLIENT_SECRET;
    document.getElementById('OAUTH_TOKEN').value = config.TWITCH.OAUTH_TOKEN;
    document.getElementById('TWITCH_CHANNEL_NAME').value = config.TWITCH.CHANNEL_NAME;
    document.getElementById('USERNAME').value = config.TWITCH.USERNAME;

    // Youtube settings
    document.getElementById('USE_YOUTUBE').checked = config.YOUTUBE.USE_YOUTUBE == true ? 1 : 0;
    document.getElementById('YOUTUBE_KEY').value = config.YOUTUBE.YOUTUBE_KEY;
    document.getElementById('CHANNEL_ID').value = config.YOUTUBE.CHANNEL_ID;
    document.getElementById('YOUTUBE_CHANNEL_NAME').value = config.YOUTUBE.CHANNEL_NAME;
    document.getElementById('USE_YOUTUBE_API_KEY').checked = config.YOUTUBE.USE_YOUTUBE_API_KEY == true ? 1 : 0;

    //Facebook settings
    document.getElementById('USE_FACEBOOK').checked = config.FACEBOOK.USE_FACEBOOK == true ? 1 : 0;
    document.getElementById('ACCESS_TOKEN').value = config.FACEBOOK.ACCESS_TOKEN;
    document.getElementById('FACEBOOK_PAGE').value = config.FACEBOOK.FACEBOOK_PAGE;
})();

if (config.SETTINGS.HAS_PYTHON_INSTALLED === '0') {
    pythonScript.CheckForPython()
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
                <div class="mmg">
                    <div class="icon-container">
                        <img class="user-img" id="user-0" src="./images/twitch-icon.png" />
                    </div>
                    <div class="msg-box">
                        <div class="flr">
                            <div class="messages">
                                <div class="lalapalooza">
                                    <span class="timestamp">
                                        <span class="username">Twitch</span>
                                        <span class="posttime">` + moment().format('hh:mm A') + `</span>
                                    </span>
                                </div>
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
                    <div class="mmg">
                        <div class="icon-container">
                            <img class="user-img" id="user-0" src="./images/youtube-icon.png" />
                        </div>
                        <div class="msg-box">
                            <div class="flr">
                                <div class="messages">
                                <span class="timestamp"><span class="username">Youtube</span><span class="posttime">` + moment().format('hh:mm A') + `</span></span>
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
//TODO: add tooltip: https://codesandbox.io/s/github/popperjs/website/tree/master/examples/placement?file=/index.html:226-284

function createNotification(message = null, type = null) {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.classList.add(type);
    notif.innerText = message;
    notification_toasts.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
};

// Small tooltip
Array.from(document.querySelectorAll('[tip]')).forEach(el => {
    let tip = document.createElement('div');
    tip.classList.add('tooltip');
    tip.innerText = el.getAttribute('tip');
    tip.style.transform =
        'translate(' +
        (el.hasAttribute('tip-left') ? 'calc(-100% - 5px)' : '15px') + ', ' +
        (el.hasAttribute('tip-top') ? '-100%' : '15px') +
        ')';
    el.appendChild(tip);
    el.onmousemove = e => {
        tip.style.left = e.pageX + 'px'
        tip.style.top = e.pageY + 'px';

    };
});