/* global say */

// Making the speak function Synchronous, it places all the voice commands in a queue
// and plays them 1 by 1. This is to not have overlapping TTS messages.
// made by Xenis.

let SelectedVoice = '';
let Encoding = '';
// const Volume = 0;

// wrap in promise
const speak = (text) => new Promise((resolve) => {
	say.setEncoding(Encoding);
	say.Volume = 0;
	say.speak(text, SelectedVoice, 1, (err) => {
		if (err) {
			console.error(err);
		}
		resolve('finished');
	});
});

// queue system
class SayQueue {
	messages = [];

	status = 0;

	async shift() {
		this.status = 1;
		while (this.messages.length > 0) { await speak(this.messages.shift(), SelectedVoice, 1); }
		this.status = 0;
	}

	add(message, selectedVoice, encoding) {
		this.messages.push(message);
		SelectedVoice = selectedVoice;
		Encoding = encoding;
		if (this.status === 0) { this.shift(); }
	}
}

const sayQueue = new SayQueue();
module.exports = sayQueue;
