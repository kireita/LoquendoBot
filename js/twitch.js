/* global showChatMessage, getPostTime, playVoice, playSound, settings, env */

const axios = require('axios');
const WebSocket = require('ws');

const ircRegex = /^(?:@([^ ]+) )?(?:[:](\S+) )?(\S+)(?: (?!:)(.+?))?(?: [:](.+))?$/;
const tagsRegex = /([^=;]+)=([^;]*)/g;
const badgesRegex = /([^,]+)\/([^,]*)/g;
const emotesRegex = /([^\/]+):([^\/]*)/g;
const emoteIndexRegex = /([^,]+)-([^,]*)/g;
const actionRegex = /^\u0001ACTION (.*)\u0001$/g;
const hostRegex = /([a-z_0-9]+)!([a-z_0-9]+)@([a-z._0-9]+)/;

let socket;

const pinger = {
	clock: false,
	start: () => {
		if (pinger.clock) {
			clearInterval(pinger.clock);
		}
		pinger.sendPing();

		pinger.clock = setInterval(() => {
			setTimeout(() => {
				pinger.sendPing();
				// jitter
			}, Math.floor((Math.random() * 1000) + 1));
		}, (4 * 60 * 1000));
		// at least ever 5 minutes
	},
	sendPing: () => {
		try {
			socket.send('PING');
			pinger.awaitPong();
		} catch (e) {
			console.log(e);

			socket.close();
		}
	},

	pingtimeout: false,
	awaitPong: () => {
		pinger.pingtimeout = setTimeout(() => {
			// console.log('WS Pong Timeout');
			socket.close();
		}, 10000);
	},
	gotPong: () => {
		clearTimeout(pinger.pingtimeout);
	},
};

const start = function () {
	socket = new WebSocket('wss://irc-ws.chat.twitch.tv');

	socket.on('close', () => {
		// console.log('Closed restarting');

		const payload = {
			user: 'Loquendo Bot',
			message: 'Restarting Twitch connection',
		};

		sendMessageTwitch('./images/twitch-icon.png', payload);

		// reconnect
		start();
	}).on('open', () => {
		// console.log('Opened');
		// pinger
		pinger.start();

		// console.log('Send Conn stuff');

		socket.send(`PASS oauth:${env.TWITCH_OAUTH_TOKEN}`);
		socket.send(`NICK ${settings.TWITCH.USERNAME}`);

		socket.send('CAP REQ :twitch.tv/commands');
		socket.send('CAP REQ :twitch.tv/tags');

		socket.send(`JOIN #${settings.TWITCH.CHANNEL_NAME.toLowerCase()}`);
	}).on('message', (raw_data) => processRawData(raw_data));
};

function processRawData(rawData) {
	const rawMessage = rawData.toString().split('\n');
	// uncomment this line to log all inbounc messages
	// console.log(message);

	for (let x = 0; x < rawMessage.length; x++) {
		// the last line is empty
		if (rawMessage[x].length == 0) {
			return;
		}

		const tags = {};
		let command = false;
		let message = '';

		const data = ircRegex.exec(rawMessage[x].trim());

		if (data === null) {
			console.error(`Couldnt parse message '${rawMessage[x]}'`);
			return;
		}

		// items
		// 0 is unparsed message
		// 1 ircV3 tags
		// 2 tmi.twitch.tv
		// 3 COMMAND
		// 4 Room
		// 5 rest/message

		// 0 ignore

		// 1 tags
		const tagData = data[1] ? data[1] : false;
		if (tagData) {
			processTagData(tagData, {
				tags,
				command,
				message,
				raw: rawMessage[x],
			});
		}

		// 2 host
		const host = hostRegex.exec(data[2]);
		let user = false;
		if (host != null) {
			user = host[1];
		}

		// 3 command
		command = data[3];

		// 4 room
		const room = data[4];
		// 5 message
		message = data[5];
		let action = false;

		// check for action
		const actionCheck = actionRegex.exec(message);
		if (actionCheck != null) {
			// it's an action
			action = true;
			message = actionCheck[1];
		}

		processPayload({
			user,
			room,
			action,
			tags,
			command,
			message,
			raw: rawMessage[x],
		});
	}
}

function processTagData(tagdata, payload) {
	let m;
	do {
		m = tagsRegex.exec(tagdata);
		if (m) {
			// unparsed, a, b
			const [, key, val] = m;

			// interrupts
			switch (key) {
			case 'badges':
			case 'badge-info':
				processBadges(key, val, payload);
				break;
			case 'emotes':
				processEmotes(key, val, payload);
				break;
			default:
				payload.tags[key] = val.replace(/\\s/g, ' ').trim(); // for \s (space)
                    /// / dupe - keys for ease
                    // if (key.indexOf('-') >= 0) {
                    //    let dupeKey = key.replace(/-/g, '_');
                    //    payload.tags[dupeKey] = val.replace(/\\s/g, ' ').trim();// for \s (space)
                    // }
			}
		}
	} while (m);
}

function processBadges(key, val, payload) {
	payload.tags[key] = {};

	let b;
	do {
		b = badgesRegex.exec(val);
		if (b) {
			const [, badge, tier] = b;
			payload.tags[key][badge] = tier;
		}
	} while (b);
}

function processEmotes(key, val, payload) {
	payload.tags[key] = {};

	let e;
	do {
		e = emotesRegex.exec(val);
		if (e) {
			const [, emoteID, indices] = e;
			// and split again

			let em;
			do {
				em = emoteIndexRegex.exec(indices);

				if (em) {
					const [, startIndex, endIndex] = em;

					// arrays!
					if (!payload.tags[key][emoteID]) {
						payload.tags[key][emoteID] = new Array();
					}
					payload.tags[key][emoteID].push({
						startIndex,
						endIndex,
					});
				}
			} while (em);
		}
	} while (e);
}

function processPayload(payload) {
	// https://tools.ietf.org/html/rfc1459
	switch (payload.command) {
	case 'PONG':
		// console.log('Pong');
		pinger.gotPong();
		break;
	case '001':
	case '002':
	case '003':
	case '004':
		// do nothing
		break;
	case 'CAP':
		// console.log('CAP ACK', payload.raw);
		break;
	case '372':
	case '375':
	case '376':
		// motd
		// console.log('Hello', payload.room);
		break;
	case '353':
	case '366':
		// names
		break;
	case 'PING':
		// Twitch sent a "R U STILL THERE?"
		socket.send(`PONG :${payload.message}`);
		break;
	case 'JOIN':
		// You joined a room
		// console.log('Joined', payload.room);

		payload = {
			user: 'Loquendo Bot',
			message: 'successfully connected to Twitch',
		};

		sendMessageTwitch('./images/twitch-icon.png', payload);
		break;
	case 'PART':
		// as the result of a PART command
		// you left a room
		break;
	case 'GLOBALUSERSTATE':
		// You connected to the server
		// here is some info about the user
		break;
	case 'USERSTATE':
		// Often sent when you send a PRIVMSG to a room
		break;
	case 'ROOMSTATE':
		// You joined a room here is the intial state (followers only etc)
		// The Room state was changed, on change only sends what changed, not the whole settings blob
		break;
	case 'PRIVMSG':
		// heres where the magic happens
		// console.log(payload);

		if (payload.user === 'restreambot') {
			break;
		}

		getUserLogoAndSendMessage(payload);
		break;
	case 'WHISPER':
		// you received a whisper, good luck replying!
		break;
	case 'USERNOTICE':
		// see https://dev.twitch.tv/docs/irc/tags#usernotice-twitch-tags
		// An "Twitch event" occured, like a subscription or raid
		break;
	case 'NOTICE':
		// General notices about Twitch/rooms you are in
		// https://dev.twitch.tv/docs/irc/commands#notice-twitch-commands
		break;
	case 'RECONNECT':
		// The server you are connected to is restarted
		// you should restart the bot and reconnect
		// close the socket and let the close handler grab it
		socket.close();
		break;
		// moderationy stuff
	case 'CLEARCHAT':
		// A users message is to be removed
		// as the result of a ban or timeout
		break;
	case 'CLEARMSG':
		// a single users message was deleted
		break;
	case 'HOSTTARGET':
		// the room you are in, is now hosting someone or has ended the host
		break;
	default:
		console.log('No Process', payload.command, payload);
	}
}

function getUserLogoAndSendMessage(payload) {
	// eslint-disable-next-line camelcase
	const client_Id = env.TWITCH_CLIENT_ID;
	// eslint-disable-next-line camelcase
	const client_Secret = env.TWITCH_CLIENT_SECRET;
	let accessToken;

	// console.log(payload)

	// Get Access Token
	const options = {
		method: 'POST',
		url: 'https://id.twitch.tv/oauth2/token',
		data: {
			grant_type: 'client_credentials',
			// eslint-disable-next-line camelcase
			client_Id,
			// eslint-disable-next-line camelcase
			client_Secret,
			audience: 'YOUR_API_IDENTIFIER',
		},
	};

	// console.log(options);

	axios.request(options).then((response) => {
		// console.log(response.data.access_token);
		// console.log(payload.tags['user-id']);
		accessToken = response.data.access_token;

		// Get user Logo with access token

		const cookies = 'CONSENT=YES+42; path=/; domain=.youtube.com;';

		const options = {
			method: 'GET',
			url: `https://api.twitch.tv/helix/users?id=${payload.tags['user-id']}`,
			// eslint-disable-next-line camelcase
			headers: { 'Client-ID': client_Id, Authorization: `Bearer ${accessToken}` },
		};

		axios.request(options).then((response) => {
			// console.log(response.data.data[0].profile_image_url);
			const logoUrl = response.data.data[0].profile_image_url;

			sendMessageTwitch(logoUrl, payload);
		}).catch((error) => {
			console.error(error);
		});
	}).catch((error) => {
		console.error(error);
	});
}

function sendMessageTwitch(logoUrl, payload) {
	if (payload.user !== settings.TWITCH.CHANNEL_NAME) {
		playSound();
		playVoice(payload.message);
	}

	const article = document.createElement('article');
	article.className = 'msg-container msg-remote';

	article.innerHTML = `
    <div class="mmg">
        <div class="icon-container">
            <img class="user-img" src="" />
            <img class="status-circle" src="./images/twitch-icon.png" />
        </div>
        <div class="msg-box">
            <div class="flr">
                <div class="messages">
                <span class="timestamp">
                    <span class="username"></span>
                    <span class="post-time"></span>
                </span>
                <br>
                <p class="msg"></p>
                </div>
            </div>
        </div>
    </div>
    `.trim();

	const userImg = article.querySelector('.icon-container > .user-img');
	if (userImg) {
		userImg.src = logoUrl;
	}

	const username = article.querySelector('.username');
	if (username) {
		username.innerText = payload.user;
	}

	const postTime = article.querySelector('.post-time');
	if (postTime) {
		postTime.innerText = getPostTime();
	}

	const msg = article.querySelector('.msg');
	if (msg) {
		msg.innerText = payload.message;
	}

	// Appends the message to the main chat box (shows the message)
	showChatMessage(article);
	// console.log(article);
	window.article = article;
}

start();
