/* exported  remote */
/* global remote */

const path = require('path'); // get directory path
const {
	remote,
	shell,
	ipcRenderer,
	BrowserWindow,
} = require('electron'); // necessary electron libraries to send data to the app
const { Say } = require('say');
// tts engine
const soundsFolder = path.join(__dirname, '/sounds/'); // sound folder location
const selectedNotificationSound = new Audio(); // sound object to reproduce notifications
const fs = require('fs');
// file system library
const notification_toasts = document.querySelector('#toasts'); // toast messages
const { PythonShell } = require('python-shell');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const talk = require('./js/voiceQueue');
// Voice queue system
const root = document.documentElement;
const { LiveChat } = require('youtube-chat');
const result = require('dotenv');
const googleTTS = require('node-google-tts-api');

const tts = new googleTTS();
const Polly = require('./js/amazon');
const Facebook = require('./js/facebook');
// const chat = require('./js/chat');
const say = new Say();
const ini = require('ini');
const request = require('request');
// configuration settings library
const settings = ini.parse(fs.readFileSync(path.join(__dirname, '/config/settings.ini'), 'utf-8')); // Read Config file
const resolutions = fs.readFileSync(path.join(__dirname, '/config/resolutions.txt')).toString().split('\r\n'); // read resolution file
const encodings = fs.readFileSync(path.join(__dirname, '/config/encodings.txt')).toString().split('\r\n'); // read encoding file
const googleVoices = fs.readFileSync(path.join(__dirname, '/config/googleVoices.txt')).toString().split('\r\n'); // read encoding file
const amazonVoices = fs.readFileSync(path.join(__dirname, '/config/amazonVoices.txt')).toString().split('\r\n'); // read encoding file
const resolutionSelect = document.querySelector('#resolution'); // obtain the html reference of the resolutions combobox
const encodingSelect = document.querySelector('#encoding'); // obtain the html reference of the encodings combobox
const googleVoiceSelect = document.querySelector('#googleVoice'); // obtain the html reference of the google voices combobox
const amazonVoiceSelect = document.querySelector('#amazonVoice'); // obtain the html reference of the amazon voices combobox
const installedTTS = document.querySelector('#installedTTS'); // obtain the html reference of the installedTTS combobox
const sound = document.querySelector('#notification'); // obtain the html reference of the sound combobox
let selectedVoiceIndex;
let selectedEncodingIndex;
const TTSVolume = 1;
let isPlaying = false;
let notificationSoundVolume = 1;
// const slider = document.body.querySelector('#slider');
const StartDateAndTime = Date.now();

// check if environment variables did not give an error
if (result.error) {
	throw result.error;
}

// Set environment variables
const env = result.config().parsed;

let amazonCredentials;
const TTSSelector = document.body.querySelector('#TTSSelector');

// On video playing toggle values
selectedNotificationSound.onplaying = function () {
	isPlaying = true;
};

// On video pause toggle values
selectedNotificationSound.onpause = function () {
	isPlaying = false;
};

function createNotification(message = null, type = null) {
	const notif = document.createElement('div');
	notif.classList.add('toast');
	notif.classList.add(type);
	notif.innerText = message;
	notification_toasts.appendChild(notif);
	setTimeout(() => notif.remove(), 10000);
}

// Check for configs
if (!settings.TWITCH.USE_TWITCH && !settings.YOUTUBE.USE_YOUTUBE && !settings.FACEBOOK.USE_FACEBOOK) {
	var text = 'Please setup a service to connect to in Configuration > Show Advanced';
	createNotification(text, 'warning');
}

if (settings.TWITCH.USE_TWITCH && !settings.TWITCH.CHANNEL_NAME) {
	var text = 'No channel name inserted in the Twitch service';
	createNotification(text, 'alert');
}

if (settings.TWITCH.USE_TWITCH && !settings.TWITCH.USERNAME) {
	var text = 'No username inserted in the Twitch service';
	createNotification(text, 'alert');
}

if (settings.YOUTUBE.USE_YOUTUBE && !settings.YOUTUBE.CHANNEL_ID) {
	var text = 'No Channel ID set in the Youtube service';
	createNotification(text, 'alert');
}

if (settings.FACEBOOK.USE_FACEBOOK && !settings.FACEBOOK.FACEBOOK_ID) {
	var text = 'No Facebook ID set in the Facebook service';
	createNotification(text, 'alert');
}

// function thomas(config) {
//     var style = document.head.querySelector("style")

//     if (!style) {
//         style = document.createElement("style");
//         document.head.appendChild(style);
//     }

//     var text = `
//     :root {
//         --main-color1: ${config.MAIN_COLOR_1} !important;
//         --main-color1-temp: #2f2c34;
//         /*Left bar and top right bar*/
//         --main-color2: white;
//         --main-color2-temp: white;
//         /*Icons and text*/
//         --main-color3: #211E1E;
//         --main-color3-temp: #211E1E;
//         /*Buttons and input*/
//         --main-color4: #2f2c34;
//         --main-color4-temp: #2f2c34;
//         --top-bar: #100B12;
//         --top-bar-temp: #100B12;
//         --mid-section: #352d3d;
//         --mid-section-temp: #352d3d;
//         --chat-bubble: #7A6D7F;
//         --chat-bubble-temp: #7A6D7F;
//         --chat-bubble-header: #141414;
//         --chat-bubble-header-temp: #141414;
//         --chat-bubble-message: white;
//         --chat-bubble-message-temp: white;
//     }
//     `
//     style.innerHTML = text;
// }

// Play sound function
function playSound() {
	if (selectedNotificationSound.paused && !isPlaying) {
		selectedNotificationSound.src = `./sounds/${sound.options[settings.SETTINGS.NOTIFICATION_SOUND].text}`;
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
	selectedEncodingIndex = encodingSelect.options[settings.SETTINGS.ENCODING].text;
	talk.add(message, selectedVoiceIndex, selectedEncodingIndex);
}

// Check for installed sounds
fs.readdir(soundsFolder, (err, files) => {
	files.forEach((file, i) => {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = file;

		// Add the option to the sound selector.
		sound.appendChild(option);
	});

	// set the saved notification sound
	sound.selectedIndex = settings.SETTINGS.NOTIFICATION_SOUND;

	// set the saved volume in the app (visual)
	document.getElementById('SoundVolume').innerText = `${settings.SETTINGS.NOTIFICATION_VOLUME}%`;

	// set the saved volume for when the sound plays (data)
	notificationSoundVolume = parseInt(document.getElementById('SoundVolume').innerText) / 100;

	// set the slider and button to the saved volume
	slider.value = settings.SETTINGS.NOTIFICATION_VOLUME;
});

// Check for installed voices
say.getInstalledVoices((err, voices) => {
	// Loop through each of the voices.
	voices.forEach((voice, i) => {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = voice;

		// Add the option to the voice selector.
		installedTTS.appendChild(option);
	});
	installedTTS.selectedIndex = settings.SETTINGS.VOICE;
});

// Check for google voices
(() => {
	for (i in googleVoices) {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = googleVoices[i];

		// Add the option to the sound selector.
		googleVoiceSelect.appendChild(option);
	}
	googleVoiceSelect.selectedIndex = settings.SETTINGS.GOOGLE_VOICE;
})();

// Check for amazon voices
(() => {
	for (i in amazonVoices) {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = amazonVoices[i];

		// Add the option to the sound selector.
		amazonVoiceSelect.appendChild(option);
	}
	amazonVoiceSelect.selectedIndex = settings.SETTINGS.AMAZON_VOICE;
})();

// Check for installed resolutions
(() => {
	for (i in resolutions) {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = resolutions[i];

		// Add the option to the sound selector.
		resolutionSelect.appendChild(option);
	}
	resolutionSelect.selectedIndex = settings.SETTINGS.RESOLUTION;
	const string = resolutionSelect.options[settings.SETTINGS.RESOLUTION].text;
	const numbers = string.match(/\d+/g).map(Number);
	ipcRenderer.send('resize-window', numbers[0], numbers[1]);
})();

// Check for installed encodings
(() => {
	for (i in encodings) {
		// Create a new option element.
		const option = document.createElement('option');

		// Set the options value and text.
		option.value = i;
		option.innerHTML = encodings[i];

		// Add the option to the sound selector.
		encodingSelect.appendChild(option);
	}
	encodingSelect.selectedIndex = settings.SETTINGS.ENCODING;
})();

// Set Advanced settings
(() => {
	// Theme
	const USE_CUSTOM_THEME = document.querySelector('#USE_CUSTOM_THEME').value = settings.THEME.USE_CUSTOM_THEME;
	document.body.querySelector('#USE_CUSTOM_THEME').checked = settings.THEME.USE_CUSTOM_THEME == true ? 1 : 0;
	setTheme(USE_CUSTOM_THEME);

	// Twitch settings
	document.body.querySelector('#USE_TWITCH').checked = settings.TWITCH.USE_TWITCH == true ? 1 : 0;
	document.body.querySelector('#TWITCH_CHANNEL_NAME').value = settings.TWITCH.CHANNEL_NAME;
	document.body.querySelector('#USERNAME').value = settings.TWITCH.USERNAME;

	// Youtube settings
	document.body.querySelector('#USE_YOUTUBE').checked = settings.YOUTUBE.USE_YOUTUBE == true ? 1 : 0;
	document.body.querySelector('#CHANNEL_ID').value = settings.YOUTUBE.CHANNEL_ID;

	// Facebook settings
	document.body.querySelector('#USE_FACEBOOK').checked = settings.FACEBOOK.USE_FACEBOOK == true ? 1 : 0;
	document.body.querySelector('#FACEBOOK_ID').value = settings.FACEBOOK.FACEBOOK_ID;
})();

// TODO: Theme switcher: https://www.studytonight.com/post/build-a-theme-switcher-for-your-website-with-javascript
// TODO: different load screen for python install: https://loading.io/css/
// TODO: different notifications for python install: https://speckyboy.com/css-js-notification-alert-code/
// TODO: add tooltip: https://codesandbox.io/s/github/popperjs/website/tree/master/examples/placement?file=/index.html:226-284

// Small tooltip
Array.from(document.body.querySelectorAll('[tip]')).forEach((el) => {
	const tip = document.createElement('div');
	tip.classList.add('tooltip');
	tip.innerText = el.getAttribute('tip');
	tip.style.transform = `translate(${
		el.hasAttribute('tip-left') ? 'calc(-100% - 5px)' : '15px'}, ${
		el.hasAttribute('tip-top') ? '-100%' : '15px'
	})`;
	el.appendChild(tip);
	el.onmousemove = (e) => {
		tip.style.left = `${e.pageX}px`;
		tip.style.top = `${e.pageY}px`;
	};
});

function showChatMessage(message) {
	document.querySelector('#chatBox').appendChild(message);
	const messages = Array.from(document.body.querySelectorAll('.msg-container'));
	const lastMessage = messages[messages.length - 1];
	lastMessage.scrollIntoView({ behavior: 'smooth' });
}

function showPreviewChatMessage() {
	const message = `
    <article class="msg-container msg-self" id="msg-0">
        <div class="icon-container-user">
            <img class="user-img-user"  src="https://gravatar.com/avatar/56234674574535734573000000000001?d=retro" />
            <img class="status-circle-user"  src="./images/twitch-icon.png" />
        </div>
        <div class="msg-box-user msg-box-user-temp">
            <div class="flr">
                <div class="messages-user">
                    <span class="timestamp timestamp-temp"><span class="username username-temp">You</span><span class="posttime">${getPostTime()}</span></span>
                    <br>
                    <p class="msg msg-temp" id="msg-0">
                        hello there 
                    </p>
                </div>
            </div>
        </div>
    </article>`;
	document.querySelector('#mini-mid').innerHTML += message;
	const messages = Array.from(document.body.querySelectorAll('#mini-mid'));
	const lastMessage = messages[messages.length - 1];
	lastMessage.scrollIntoView({ behavior: 'smooth' });
}

showPreviewChatMessage();

function getPostTime() {
	const d = new Date();

	const year = document.body.querySelectorAll('.container').innerHTML = d.getFullYear();
	const month = document.body.querySelectorAll('.container').innerHTML = d.getMonth() + 1;
	const day = document.body.querySelectorAll('.container').innerHTML = d.getDay();
	const hours = document.body.querySelectorAll('.container').innerHTML = d.getHours();
	const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
	const time = `${hours}:${minutes}`;

	return time;
}

function setTheme(USE_CUSTOM_THEME) {
	// console.log(USE_CUSTOM_THEME);

	document.querySelector('#MAIN_COLOR_1').value = settings.THEME.MAIN_COLOR_1;
	const MAIN_COLOR_1 = document.querySelector('#MAIN_COLOR_1').value;
	root.style.setProperty('--main-color1-temp', MAIN_COLOR_1);

	document.querySelector('#MAIN_COLOR_2').value = settings.THEME.MAIN_COLOR_2;
	const MAIN_COLOR_2 = document.querySelector('#MAIN_COLOR_2').value;
	root.style.setProperty('--main-color2-temp', MAIN_COLOR_2);

	document.querySelector('#MAIN_COLOR_3').value = settings.THEME.MAIN_COLOR_3;
	const MAIN_COLOR_3 = document.querySelector('#MAIN_COLOR_3').value;
	root.style.setProperty('--main-color3-temp', MAIN_COLOR_3);

	document.querySelector('#MAIN_COLOR_4').value = settings.THEME.MAIN_COLOR_4;
	const MAIN_COLOR_4 = document.querySelector('#MAIN_COLOR_4').value;
	root.style.setProperty('--main-color4-temp', MAIN_COLOR_4);

	document.querySelector('#TOP_BAR').value = settings.THEME.TOP_BAR;
	const TOP_BAR = document.querySelector('#TOP_BAR').value;
	root.style.setProperty('--top-bar-temp', TOP_BAR);

	document.querySelector('#MID_SECTION').value = settings.THEME.MID_SECTION;
	const MID_SECTION = document.querySelector('#MID_SECTION').value;
	root.style.setProperty('--mid-section-temp', MID_SECTION);

	document.querySelector('#CHAT_BUBBLE_BG').value = settings.THEME.CHAT_BUBBLE_BG;
	const CHAT_BUBBLE_BG = document.querySelector('#CHAT_BUBBLE_BG').value;
	root.style.setProperty('--chat-bubble-temp', CHAT_BUBBLE_BG);

	document.querySelector('#CHAT_BUBBLE_HEADER').value = settings.THEME.CHAT_BUBBLE_HEADER;
	const CHAT_BUBBLE_HEADER = document.querySelector('#CHAT_BUBBLE_HEADER').value;
	root.style.setProperty('--chat-bubble-header-temp', CHAT_BUBBLE_HEADER);

	document.querySelector('#CHAT_BUBBLE_MESSAGE').value = settings.THEME.CHAT_BUBBLE_MESSAGE;
	const CHAT_BUBBLE_MESSAGE = document.querySelector('#CHAT_BUBBLE_MESSAGE').value;
	root.style.setProperty('--chat-bubble-message-temp', CHAT_BUBBLE_MESSAGE);

	if (USE_CUSTOM_THEME) {
		root.style.setProperty('--main-color1', MAIN_COLOR_1);

		root.style.setProperty('--main-color2', MAIN_COLOR_2);

		root.style.setProperty('--main-color3', MAIN_COLOR_3);

		root.style.setProperty('--main-color4', MAIN_COLOR_4);

		root.style.setProperty('--top-bar', TOP_BAR);

		root.style.setProperty('--mid-section', MID_SECTION);

		root.style.setProperty('--chat-bubble', CHAT_BUBBLE_BG);

		root.style.setProperty('--chat-bubble-header', CHAT_BUBBLE_HEADER);

		root.style.setProperty('--chat-bubble-message', CHAT_BUBBLE_MESSAGE);
	} else {
		root.style.setProperty('--main-color1', '#6e2c8c');

		root.style.setProperty('--main-color2', 'white');

		root.style.setProperty('--main-color3', '#211E1E');

		root.style.setProperty('--main-color4', '#2f2c34');

		root.style.setProperty('--top-bar', '#100B12');

		root.style.setProperty('--mid-section', '#352d3d');

		root.style.setProperty('--chat-bubble', ' #7A6D7F');

		root.style.setProperty('--chat-bubble-header', '#141414');

		root.style.setProperty('--chat-bubble-message', 'white');
	}
}

// const fb = new Facebook(settings.FACEBOOK.FACEBOOK_ID, env.FACEBOOK_ACCESS_TOKEN);
// console.log(env.FACEBOOK_ACCESS_TOKEN);

// fb.on('ready', () => {
//     console.log('ready!');
//     fb.listen(1000);
// });

// fb.on('chat', json => {
//     console.log(json.message);
// });

// fb.on('error', err => {
//     console.log(err);
// });

// Google TTS
// tts.get({
//     text: "hello world",
//     lang: "es"
// }).then(data => {
//     // returns mp3 audio src buffer
//     fs.writeFileSync("./sounds/tts/Google_audio.mp3", data);
//     var tts = new Audio();
//     tts.src = './sounds/tts/Google_audio.mp3';
//     //lol.volume = notificationSoundVolume;
//     tts.play();
// });

// Amazon TTS
amazonCredentials = { accessKeyId: env.AMAZON_ACCESS_KEY, secretAccessKey: env.AMAZON_ACCESS_SECRET };

const polly = new Polly(amazonCredentials);
const options = {
	text: 'Hallo mijn naam is KEES',
	voiceId: 'Lotte',
};

const fileStream = fs.createWriteStream('./sounds/tts/Amazon_audio.mp3');

polly.textToSpeech(options, (err, audioStream) => {
	if (err) {
		return console.log(err.message);
	}
	audioStream.pipe(fileStream);

	// const tts = new Audio();
	// tts.src = './sounds/tts/Amazon_audio.mp3';
	// // lol.volume = notificationSoundVolume;
	// tts.play();
});
