/* global playSound, playVoice, getPostTime, showChatMessage, playSound, playVoice, StartDateAndTime
youtubeTemplate, settings, request */

// const liveChat = new LiveChat({ channelId: 'UC8v86z0UWlgIg-foURD1Lyw' });

let liveId;
const JsSoup = require('jssoup').default;
const { LiveChat } = require('youtube-chat');

function sendMessageYoutube(chatItem) {
	if (!chatItem.isOwner) {
		playSound();
		playVoice(chatItem.message[0].text);
	}

	const article = document.createElement('article');
	article.className = 'msg-container msg-remote';

	article.innerHTML = youtubeTemplate;

	const userImg = article.querySelector('.icon-container > .user-img');
	if (userImg) {
		userImg.src = chatItem.author.thumbnail.url;
	}

	const username = article.querySelector('.username');
	if (username) {
		username.innerText = chatItem.author.name;
	}

	const postTime = article.querySelector('.post-time');
	if (postTime) {
		postTime.innerText = getPostTime();
	}

	const msg = article.querySelector('.msg');
	if (msg) {
		msg.innerText = chatItem.message[0].text;
	}

	// Appends the message to the main chat box (shows the message)
	showChatMessage(article);
}

function test() {
	const liveChat = new LiveChat({ liveId });

	const ok = liveChat.start();

	// Emit at start of observation chat.
	// liveId: string
	liveChat.on('start', (/* liveId */) => {
	/* Your code here! */

		const chatItem = {
			author: {
				name: 'Loquendo Bot',
				thumbnail: { url: './images/youtube-icon.png' },
			},
			message: { 0: { text: 'successfully connected to Youtube' } },
		};

		sendMessageYoutube(chatItem);
	});

	// Emit at end of observation chat.
	// reason: string?
	liveChat.on('end', (/* reason */) => {
	/* Your code here! */
	// console.log("2");
	});

	// Emit at receive chat.
	// chat: ChatItem
	liveChat.on('chat', (chatItem) => {
	/* Your code here! */
		const MessageDateAndTime = Date.parse(chatItem.timestamp);

		if (MessageDateAndTime <= StartDateAndTime) {
			return;
		}

		if ((chatItem.author.name === 'restreambot' || chatItem.author.name === 'Restream Bot')) {
			return;
		}

		sendMessageYoutube(chatItem);
	});

	// Emit when an error occurs
	// err: Error or any
	liveChat.on('error', (err) => {
	/* Your code here! */
		console.error(`${err}liveStreamId = ${liveId}`);
	});

	// Start fetch loop
	if (!ok) {
		console.warn('Failed to start, check emitted error');
	}
}

async function getYoutubeLiveStream() {
	const channelId = settings.YOUTUBE.CHANNEL_ID;

	if (!channelId) {
		console.error('No ID has been provided');
	}

	const options = {
		method: 'GET',
		url: `https://www.youtube.com/channel/${channelId}/live`,
		headers:
				{
					'cache-control': 'no-cache',
					Connection: 'keep-alive',
					Cookie: 'CONSENT=YES+42',
					Host: 'www.youtube.com',
					'Postman-Token': '22881d06-be4b-4ff5-9e91-67ce106f8379,151619c9-a51e-4f11-9318-2961809b2fa4',
					'Cache-Control': 'no-cache',
					Accept: '*/*',
					'User-Agent': 'PostmanRuntime/7.17.1',
				},
	};

	await request(options, (error, response, body) => {
		if (error) throw new Error(error);

		const soup = new JsSoup(body, false);

		const soupFind = soup.findAll('link', { rel: 'canonical' });
		const tag = soupFind[0].attrs;
		const tagsRegex = /[^=]+$/g;
		const myRe = new RegExp(tagsRegex);

		liveId = myRe.exec(tag.href)[0];

		if (liveId) {
			test();
		}
	});
}

getYoutubeLiveStream();
