// Making the speak function Synchronous, it places all the voice commands in a queue
// and plays them 1 by 1. This is to not have overlapping TTS messages.
// made by Xenis.

//wrap in promise
const speak = (text) => {
    return new Promise((resolve, reject) => {
        // TODO: need to make encoding optional for pronunciation and minimal test in frontend.
        say.setEncoding('437')
            // TODO make voice choosable in frontend.
        say.speak(text, 'Vocalizer Expressive Jorge Harpo 22kHz', 1, (err) => {
            resolve('finished');
        });
    });
};

//queue system
class SayQueue {
    messages = []
    status = 0

    async shift() {
        this.status = 1;
        while (this.messages.length > 0)
            await speak(this.messages.shift(), 'Vocalizer Expressive Jorge Harpo 22kHz', 1);
        this.status = 0;
    }

    add(message) {
        this.messages.push(message);
        if (this.status === 0)
            this.shift();
    }
}

const sayQueue = new SayQueue();
module.exports = sayQueue;