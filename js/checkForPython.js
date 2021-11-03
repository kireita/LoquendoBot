const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function CheckForPip() {
    try {
        const { stdout, stderr } = await exec('python -m pip --version');
        console.log('2 - stdout:', stdout);

        let n = stdout.search(/pip \s*([\d.]+)/);

        if (n >= 0) {

            var text = 'Pip is installed in machine';
            createNotification(text, 'alert');
            InstallRequests();

        } else {

            var text = 'Please install Pip, to install pip go here: https://pip.pypa.io/en/stable/installation/';
            createNotification(text, 'alert');

        }
    } catch (e) {
        console.error(e);
    }
}

async function InstallRequests() {
    try {

        var text = 'Installing requests';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install requests');
        console.log('3 - stdout:', stdout);

        InstallIrc();

    } catch (e) {
        console.error(e);
    }
}

async function InstallIrc() {
    try {

        var text = 'Installing irc';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install irc');
        console.log('4 - stdout:', stdout);

        InstallPyLinq()
    } catch (e) {
        console.error(e);
    }
}

async function InstallPyLinq() {
    try {

        var text = 'Installing py-linq';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install py-linq');
        console.log('5 - stdout:', stdout);

        InstallSix();

    } catch (e) {
        console.error(e);
    }
}

async function InstallSix() {
    try {

        var text = 'Installing six';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install six');
        console.log('6 - stdout:', stdout);

        InstallConfigparser();

    } catch (e) {
        console.error(e);
    }
}

async function InstallConfigparser() {
    try {

        var text = 'Installing configparser';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install configparser');
        console.log('7 - stdout:', stdout);

        InstallDotenv();

    } catch (e) {
        console.error(e);
    }
}

async function InstallDotenv() {
    try {

        var text = 'Installing python-dotenv';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install python-dotenv');
        console.log('8 - stdout:', stdout);

        InstallPytchat();

    } catch (e) {
        console.error(e);
    }
}

async function InstallPytchat() {
    try {

        var text = 'Installing pytchat';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install pytchat ');
        console.log('9 - stdout:', stdout);

        InstallBs4();

    } catch (e) {
        console.error(e);
    }
}

async function InstallBs4() {
    try {

        var text = 'Installing bs4';
        createNotification(text, 'alert');

        const { stdout, stderr } = await exec('pip install bs4 ');
        console.log('10 - stdout:', stdout);

        RestartBot()

    } catch (e) {
        console.error(e);
    }
}

async function RestartBot() {
    try {

        var text = 'Restarting Bot';
        createNotification(text, 'alert');

        config.SETTINGS.HAS_PYTHON_INSTALLED = '1';
        var lol = path.join(__dirname, '../config/settings.ini');
        console.log(lol);
        fs.writeFileSync(lol, ini.stringify(config))

        ipcRenderer.sendSync('synchronous-message', 'restart')

    } catch (e) {
        console.error(e);
    }
}

class InitScript {
    async CheckForPython() {
        try {
            const { stdout, stderr } = await exec('python --version');
            console.log('1 - stdout:', stdout);
            let n = stdout.search(/Python 3\s*([\d.]+)/);
            // TODO : verify awnser
            if (n >= 0) {

                var text = 'Python is installed in machine';
                createNotification(text, 'alert');
                CheckForPip()
            } else {

                var text = 'Please install Python, to get python go here: https://www.python.org/';
                createNotification(text, 'alert');

            }
        } catch (e) {
            console.error(e);
        }
    }
}

const initScript = new InitScript();
module.exports = initScript;