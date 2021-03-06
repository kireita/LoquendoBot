const get = require('request').get;
const EventEmitter = require('event-chains');

let fbInterval;

class FacebookLive extends EventEmitter {
	constructor(userId, userKey) {
		super();
		this.id = userId;
		this.key = userKey;
		this.getLive();
	}

	getLive() {
		get({ url: `https://graph.facebook.com/v12.0/${this.id}/live_videos?broadcast_status=['LIVE']&access_token=${this.key}`, json: true }, (err, res, json) => {
			if (err) {
				this.emit('error', err);
			} else if (res.statusCode !== 200) {
				this.emit('error', json);
			} else if (!json.data[0]) {
				this.emit('error', 'Can not find live');
			} else {
				this.liveId = json.data[0].id;
				this.emit('ready', null);
			}
		});
	}

	getChat() {
		get({ url: `https://graph.facebook.com/v12.0/${this.liveId}/comments?order=reverse_chronological&access_token=${this.key}`, json: true }, (err, res, json) => {
			if (err) {
				this.emit('error', err);
			} else if (res.statusCode !== 200) {
				this.emit('error', json);
			} else {
				this.emit('json', json);
			}
		});
	}

	listen(timeout) {
		fbInterval = setInterval(() => { this.getChat(); }, timeout);
		let lastRead = 0;
		let item = {};
		let time = 0;
		this.on('json', (json) => {
			for (let i = 0; i < json.data.length; i + 1) {
				item = json.data[i];
				time = new Date(item.created_time).getTime();
				if (lastRead < time) {
					lastRead = time;
					this.emit('chat', item);
				}
			}
		});
		this.on('stop', (stopCall) => {
			clearInterval(fbInterval);
			console.warn(stopCall);
		});
	}
}

module.exports = FacebookLive;
