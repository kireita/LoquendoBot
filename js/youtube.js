const liveChat = new LiveChat({ liveId: 'udj5SkWoKU4' });
// const liveChat = new LiveChat({ channelId: "UC8v86z0UWlgIg-foURD1Lyw" })

const ok = liveChat.start();
const yyy = Date.parse(getPostTime());

// Emit at start of observation chat.
// liveId: string
liveChat.on('start', (liveId) => {
	/* Your code here! */
	// console.log("1");

	chatItem = {
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
liveChat.on('end', (reason) => {
	/* Your code here! */
	// console.log("2");
});

// Emit at receive chat.
// chat: ChatItem
liveChat.on('chat', (chatItem) => {
	/* Your code here! */
	const MessageDateAndTime = Date.parse(chatItem.timestamp);

	if (MessageDateAndTime < StartDateAndTime) {
		return;
	}

	if (chatItem.author.name === 'restreambot' || chatItem.author.name === 'Restream Bot') {
		return;
	}

	console.log(chatItem);
	sendMessageYoutube(chatItem);
});

// Emit when an error occurs
// err: Error or any
liveChat.on('error', (err) => {
	/* Your code here! */
	console.log(err);
});

// Start fetch loop

if (!ok) {
	console.log('Failed to start, check emitted error');
}

function sendMessageYoutube(chatItem) {
	if (!chatItem.isOwner) {
		playSound();
		playVoice(chatItem.message[0].text);
	}

	const article = document.createElement('article');
	article.className = 'msg-container msg-remote';

	article.innerHTML = `
    <div class="mmg">
        <div class="icon-container">
            <img class="user-img" src="" />
            <img class="status-circle" src="./images/youtube-icon.png" />
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
