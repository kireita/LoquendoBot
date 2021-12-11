/* global getPostTime showChatMessage fs, path, root, settings ini, selectedEncoding, TTSSelector,
config, shell, ipcRenderer, selectedResolution, encodingSelect, installedTTS, talk, sound,
selectedNotificationSound, notificationSoundVolume, selectedVoice, userTemplate */

function getResponse() {
	const userText = document.querySelector('#textInput').value;

	// If nothing is written don't do anything
	if (userText === '') {
		return;
	}

	// Create chat message from received data
	const article = document.createElement('article');
	article.className = 'msg-container msg-self';

	article.innerHTML = userTemplate;

	const postTime = article.querySelector('.post-time');
	if (postTime) {
		postTime.innerText = getPostTime();
	}

	const msg = article.querySelector('.msg');
	if (msg) {
		msg.innerText = userText;
	}

	// Appends the message to the main chat box (shows the message)
	showChatMessage(article);

	// Empty input box after sending message
	document.body.querySelector('#textInput').value = '';
}

// Function that will execute when you press 'enter' in the message box
document.body.querySelector('#textInput').addEventListener('keydown', (e) => {
	if (e.which === 13) {
		getResponse();
	}
});

// Function that will execute when you click the 'send' button
document.body.querySelector('#SendButton').addEventListener('click', () => {
	getResponse();
});

// #endregion

// #region Panel retraction function

// Left panel
document.body.querySelector('.circle-left').addEventListener('click', () => {
	const menu = document.body.querySelector('.sidepanel-left');

	if (menu.classList.contains('collapse-menu')) {
		menu.classList.remove('collapse-menu');
	} else {
		menu.classList.add('collapse-menu');
	}

	const leftCircle = document.body.querySelector('.circle-left');

	if (leftCircle.classList.contains('collapse-circle-left')) {
		leftCircle.classList.remove('collapse-circle-left');
	} else {
		leftCircle.classList.add('collapse-circle-left');
	}
});

document.body.querySelector('.circle-right').addEventListener('click', () => {
	const menu = document.body.querySelector('.sidepanel-right');

	if (menu.classList.contains('collapse-menu')) {
		menu.classList.remove('collapse-menu');
	} else {
		menu.classList.add('collapse-menu');
	}

	const leftCircle = document.body.querySelector('.circle-right');

	if (leftCircle.classList.contains('collapse-circle-right')) {
		leftCircle.classList.remove('collapse-circle-right');
	} else {
		leftCircle.classList.add('collapse-circle-right');
	}
});

// #endregion

// #region Show panels

// TODO: animate Option panels
// TODO : optimize show panels
// Function that shows and hides the option panels. (TTS, Configuration, Commands)
const displayPanel = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
	const btn = document.querySelector(btnSelectorID);
	const panel = document.querySelector(panelSelectorID);
	const panels = document.querySelectorAll(panelSelectorClass);

	btn.addEventListener('click', (event) => {
		event.stopPropagation();
		panels.forEach((el) => {
			if (el === panel) return;
			el.classList.remove('show');
		});
		if (panel.classList.contains('show')) {
			// panel.classList.remove('show');
		} else {
			panel.classList.add('show');
		}
	}, {
		capture: true,
	});
};

displayPanel('.OptionPanel', '#Configuration', '#btnConfiguration');
displayPanel('.OptionPanel', '#Commands', '#btnCommands');
displayPanel('.OptionPanel', '#TTS', '#btnTTS');
displayPanel('.OptionPanel', '#Chat', '#btnChat');

const displayPanelX = (panelSelectorClass, panelSelectorID, btnSelectorID) => {
	const btn = document.querySelector(btnSelectorID);
	const panel = document.querySelector(panelSelectorID);
	const panels = document.querySelectorAll(panelSelectorClass);

	btn.addEventListener('click', (event) => {
		event.stopPropagation();
		panels.forEach((el) => {
			if (el === panel) return;
			el.classList.remove('item-active');
		});
		if (panel.classList.contains('item-active')) {
			// panel.classList.remove('item-active');
		} else {
			panel.classList.add('item-active');
		}
	}, {
		capture: true,
	});
};

displayPanelX('.item', '#btnTTS', '#btnTTS');
displayPanelX('.item', '#btnChat', '#btnChat');
displayPanelX('.item', '#btnCommands', '#btnCommands');
displayPanelX('.item', '#btnConfiguration', '#btnConfiguration');

// #endregion

// #region Volume slider
const slider = document.body.querySelector('#sliderX');
const bar = document.body.querySelector('.bar');
const fill = document.body.querySelector('.fill');

function setBar() {
	fill.style.width = `${slider.value}%`;
	bar.style.width = `${slider.value}%`;
}

slider.addEventListener('change', setRange);
slider.addEventListener('input', setBar);

function setRange(event) {
	const value = event.target.value;
	document.getElementById('SoundVolume').innerText = `${value}%`;
}

setBar();

// #endregion

// #region Show/Hide Advanced Menu
document.body.querySelector('#ShowAdvancedMenu').addEventListener('click', () => {
	document.getElementById('AdvancedMenu_mask').style.visibility = 'visible';
});

document.body.querySelector('#HideAdvancedMenu').addEventListener('click', () => {
	document.getElementById('AdvancedMenu_mask').style.visibility = 'hidden';
});

// #endregion

// #region Show/Hide Theme Creator
document.body.querySelector('#ShowThemeCreator').addEventListener('click', () => {
	document.getElementById('ThemeCreator_mask').style.visibility = 'visible';
});

document.body.querySelector('#HideThemeCreator').addEventListener('click', () => {
	document.getElementById('ThemeCreator_mask').style.visibility = 'hidden';
});

// #endregion

// #region Theme changer
document.body.querySelector('#MAIN_COLOR_1').addEventListener('input', () => {
	const x = document.getElementById('MAIN_COLOR_1').value;
	root.style.setProperty('--main-color1-temp', x);
});

document.body.querySelector('#MAIN_COLOR_1').addEventListener('change', () => {
	settings.THEME.MAIN_COLOR_1 = document.getElementById('MAIN_COLOR_1').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#MAIN_COLOR_2').addEventListener('input', () => {
	const x = document.getElementById('MAIN_COLOR_2').value;
	root.style.setProperty('--main-color2-temp', x);
});

document.body.querySelector('#MAIN_COLOR_2').addEventListener('change', () => {
	settings.THEME.MAIN_COLOR_2 = document.getElementById('MAIN_COLOR_2').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#MAIN_COLOR_3').addEventListener('input', () => {
	const x = document.getElementById('MAIN_COLOR_3').value;
	root.style.setProperty('--main-color3-temp', x);
});

document.body.querySelector('#MAIN_COLOR_3').addEventListener('change', () => {
	settings.THEME.MAIN_COLOR_3 = document.getElementById('MAIN_COLOR_3').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#MAIN_COLOR_4').addEventListener('input', () => {
	const x = document.getElementById('MAIN_COLOR_4').value;
	root.style.setProperty('--main-color4-temp', x);
});

document.body.querySelector('#MAIN_COLOR_4').addEventListener('change', () => {
	settings.THEME.MAIN_COLOR_4 = document.getElementById('MAIN_COLOR_4').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#TOP_BAR').addEventListener('input', () => {
	const x = document.getElementById('TOP_BAR').value;
	root.style.setProperty('--top-bar-temp', x);
});

document.body.querySelector('#TOP_BAR').addEventListener('change', () => {
	settings.THEME.TOP_BAR = document.getElementById('TOP_BAR').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#MID_SECTION').addEventListener('input', () => {
	const x = document.getElementById('MID_SECTION').value;
	root.style.setProperty('--mid-section-temp', x);
});

document.body.querySelector('#MID_SECTION').addEventListener('change', () => {
	settings.THEME.MID_SECTION = document.getElementById('MID_SECTION').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#CHAT_BUBBLE_BG').addEventListener('input', () => {
	const x = document.getElementById('CHAT_BUBBLE_BG').value;
	root.style.setProperty('--chat-bubble-temp', x);
});

document.body.querySelector('#CHAT_BUBBLE_BG').addEventListener('change', () => {
	settings.THEME.CHAT_BUBBLE_BG = document.getElementById('CHAT_BUBBLE_BG').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#CHAT_BUBBLE_HEADER').addEventListener('input', () => {
	const x = document.getElementById('CHAT_BUBBLE_HEADER').value;
	root.style.setProperty('--chat-bubble-header-temp', x);
});

document.body.querySelector('#CHAT_BUBBLE_HEADER').addEventListener('change', () => {
	settings.THEME.CHAT_BUBBLE_HEADER = document.getElementById('CHAT_BUBBLE_HEADER').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#CHAT_BUBBLE_MESSAGE').addEventListener('input', () => {
	const x = document.getElementById('CHAT_BUBBLE_MESSAGE').value;
	root.style.setProperty('--chat-bubble-message-temp', x);
});

document.body.querySelector('#CHAT_BUBBLE_MESSAGE').addEventListener('change', () => {
	settings.THEME.CHAT_BUBBLE_MESSAGE = document.getElementById('CHAT_BUBBLE_MESSAGE').value;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

// #endregion

// #region Test/Save TTS
document.body.querySelector('#TTSTestButton').addEventListener('click', () => {
	const text = document.getElementById('TTSTest').value;
	const voice = document.getElementById('installedTTS');
	const encoding = document.getElementById('encoding');

	selectedVoice = voice.options[voice.selectedIndex].text;
	selectedEncoding = encoding.options[encoding.selectedIndex].text;
	talk.add(text, selectedVoice, selectedEncoding);
	console.log(voice);
});

document.body.querySelector('#installedTTS').addEventListener('change', () => {
	settings.SETTINGS.VOICE = installedTTS.selectedIndex;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#encoding').addEventListener('change', () => {
	settings.SETTINGS.ENCODING = encodingSelect.selectedIndex;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#sliderX').addEventListener('change', () => {
	// TODO: resolve volume control of TTS
	config.SETTINGS.VOICE_VOLUME;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(config));
});
// #endregion

// #region Test/change/Save Configuration
document.body.querySelector('#notification').addEventListener('change', () => {
	settings.SETTINGS.NOTIFICATION_SOUND = sound.selectedIndex;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#slider').addEventListener('change', () => {
	settings.SETTINGS.NOTIFICATION_VOLUME = parseInt(document.getElementById('SoundVolume').innerText);
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('#resolution').addEventListener('change', () => {
	const resolution = document.getElementById('resolution');
	selectedResolution = resolution.options[resolution.selectedIndex].text;
	const numbers = selectedResolution.match(/\d+/g).map(Number);
	ipcRenderer.send('resize-window', numbers[0], numbers[1]);

	settings.SETTINGS.RESOLUTION = resolutionSelect.selectedIndex;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

document.body.querySelector('.SaveButton').addEventListener('click', () => {
	// Theme
	settings.THEME.MAIN_COLOR_1 = document.getElementById('MAIN_COLOR_1').value;
	settings.THEME.MAIN_COLOR_2 = document.getElementById('MAIN_COLOR_2').value;
	settings.THEME.MAIN_COLOR_3 = document.getElementById('MAIN_COLOR_3').value;
	settings.THEME.MAIN_COLOR_4 = document.getElementById('MAIN_COLOR_4').value;
	settings.THEME.TOP_BAR = document.getElementById('TOP_BAR').value;
	settings.THEME.MID_SECTION = document.getElementById('MID_SECTION').value;
	settings.THEME.CHAT_BUBBLE_BG = document.getElementById('CHAT_BUBBLE_BG').value;
	settings.THEME.CHAT_BUBBLE_HEADER = document.getElementById('CHAT_BUBBLE_HEADER').value;
	settings.THEME.CHAT_BUBBLE_MESSAGE = document.getElementById('CHAT_BUBBLE_MESSAGE').value;

	// Twitch settings
	settings.TWITCH.USE_TWITCH = document.getElementById('USE_TWITCH').checked;
	settings.TWITCH.CHANNEL_NAME = document.getElementById('TWITCH_CHANNEL_NAME').value;
	settings.TWITCH.USERNAME = document.getElementById('USERNAME').value;

	// Youtube settings
	settings.YOUTUBE.USE_YOUTUBE = document.getElementById('USE_YOUTUBE').checked;
	settings.YOUTUBE.CHANNEL_ID = document.getElementById('CHANNEL_ID').value;

	// Facebook settings
	settings.FACEBOOK.USE_FACEBOOK = document.getElementById('USE_FACEBOOK').checked;
	settings.FACEBOOK.FACEBOOK_ID = document.getElementById('FACEBOOK_ID').value;

	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));

	document.body.querySelector('#resolution').addEventListener('change', () => {
		const resolution = document.getElementById('resolution');
		selectedResolution = resolution.options[resolution.selectedIndex].text;
		const numbers = selectedResolution.match(/\d+/g).map(Number);
		ipcRenderer.send('resize-window', numbers[0], numbers[1]);
	});
});

// #endregion

// #region Top bar buttons
document.body.querySelector('#min-button').addEventListener('click', () => {
	ipcRenderer.send('minimize-window');
});

document.body.querySelector('#max-button').addEventListener('click', () => {
	ipcRenderer.send('maximize-window');
});

document.body.querySelector('#close-button').addEventListener('click', () => {
	ipcRenderer.send('close-window');
});
// #endregion

// #region Notification sound test
document.body.querySelector('#SoundTestButton').addEventListener('click', () => {
	if (selectedNotificationSound.paused && !isPlaying) {
		const notificationSound = document.getElementById('notification');
		selectedNotificationSound.src = `./sounds/${sound.options[notificationSound.selectedIndex].text}`;
		selectedNotificationSound.volume = notificationSoundVolume;
		selectedNotificationSound.play();
	}
});
// #endregion

// #region Use twitch toggle logic
document.body.querySelector('#USE_TWITCH').addEventListener('click', () => {
	setTwitchToggle();
});

function setTwitchToggle() {
	const toggle = document.getElementById('USE_TWITCH').checked;
	const inputs = document.getElementsByClassName('inputTwitch');
	toggleRadio(toggle, inputs);
}

setTwitchToggle();
// #endregion

// #region Use Youtube toggle logic
document.body.querySelector('#USE_YOUTUBE').addEventListener('click', () => {
	setYoutubeToggle();
});

function setYoutubeToggle() {
	const toggle = document.getElementById('USE_YOUTUBE').checked;
	const inputs = document.getElementsByClassName('inputYoutube');
	toggleRadio(toggle, inputs);
}

setYoutubeToggle();

// #endregion

// #region Use Custom theme toggle logic
document.body.querySelector('#USE_CUSTOM_THEME').addEventListener('click', () => {
	setCustomThemeToggle();

	const toggle = document.getElementById('USE_CUSTOM_THEME').checked;
	settings.THEME.USE_CUSTOM_THEME = toggle;
	fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));
});

function setCustomThemeToggle() {
	const toggle = document.getElementById('USE_CUSTOM_THEME').checked;
	const inputs = document.getElementsByClassName('inputTheme');
	toggleRadio(toggle, inputs);
	setTheme(toggle);
}

setCustomThemeToggle();

// #endregion

// #region Use Facebook toggle logic
document.body.querySelector('#USE_FACEBOOK').addEventListener('click', () => {
	setFacebookToggle();
});

function setFacebookToggle() {
	const toggle = document.getElementById('USE_FACEBOOK').checked;
	const inputs = document.getElementsByClassName('inputFacebook');
	toggleRadio(toggle, inputs);
}

setFacebookToggle();
// #endregion

// #region disable channel toggle logic
function toggleRadio(toggle, inputs) {
	if (toggle === true) {
		for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = false; }
	} else {
		for (let i = 0; i < inputs.length; i += 1) { inputs[i].disabled = true; }
	}
}
// #endregion

// #region Info buttons
document.body.querySelector('#Info_CHANNEL_ID').addEventListener('click', () => shell.openExternal('https://support.google.com/youtube/answer/3250431'));
document.body.querySelector('#Info_FACEBOOK_ID').addEventListener('click', () => shell.openExternal('https://www.facebook.com/help/1503421039731588'));
// #endregion

Array.from(TTSSelector.querySelectorAll('[name="voiceService"]')).forEach((node) => {
	node.addEventListener('change', (e) => {
		const { target } = e;

		if (!target) { return; }

		settings.SETTINGS.SELECTED_TTS = target.id;
		fs.writeFileSync(path.join(__dirname, '/config/settings.ini'), ini.stringify(settings));

		Array.from(TTSSelector.querySelectorAll('select')).forEach((x) => {
			if (x !== target.parentElement.previousElementSibling) {
				x.disabled = true;
			} else { x.disabled = false; }
		});
	});
});

// Get the selected TTS
const selectedTTS = TTSSelector.querySelector(`#${settings.SETTINGS.SELECTED_TTS}`);

if (selectedTTS) {
	selectedTTS.checked = true;

	// Dispatch the event to initialize logic.
	selectedTTS.dispatchEvent(new Event('change'));
}

// TODO: get livechatid for youtube chat to be able to send messages
// TODO: remove Jquery , NO NEED FOR MORE SPACE USAGE!!!
// TODO: investigate Jquery difference with Javascript
// BUG: $ sign is Jquery.
// BUG: figure out ES5 vs ES6
// TODO: npm install eslint (code verification), extend airbnb (because thomas said so)
