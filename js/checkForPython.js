const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function CheckForPip() {
    try {
        const { stdout, stderr } = await exec('python -m pip --version');
        console.log('2 - stdout:', stdout);

        let n = stdout.search(/pip \s*([\d.]+)/);

        if (n >= 0) {

            notice.showToast({
                text: 'Pip is installed in machine',
                type: 'success',
                showClose: 'true'
            });

            InstallRequests();
        } else {

            notice.showToast({
                text: 'Please install Pip, to install pip go here: https://pip.pypa.io/en/stable/installation/',
                type: 'warning',
                showClose: 'true'
            });

        }
    } catch (e) {
        console.error(e);
    }
}

async function InstallRequests() {
    try {

        notice.showToast({
            text: 'Installing requests',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install requests');
        console.log('3 - stdout:', stdout);

        InstallIrc();

    } catch (e) {
        console.error(e);
    }
}

async function InstallIrc() {
    try {

        notice.showToast({
            text: 'Installing irc',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install irc');
        console.log('4 - stdout:', stdout);

        InstallPyLinq()
    } catch (e) {
        console.error(e);
    }
}

async function InstallPyLinq() {
    try {

        notice.showToast({
            text: 'Installing py-linq',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install py-linq');
        console.log('5 - stdout:', stdout);

        InstallSix();

    } catch (e) {
        console.error(e);
    }
}

async function InstallSix() {
    try {

        notice.showToast({
            text: 'Installing six',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install six');
        console.log('6 - stdout:', stdout);

        InstallConfigparser();

    } catch (e) {
        console.error(e);
    }
}

async function InstallConfigparser() {
    try {

        notice.showToast({
            text: 'Installing configparser',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install configparser');
        console.log('7 - stdout:', stdout);

        InstallDotenv();

    } catch (e) {
        console.error(e);
    }
}

async function InstallDotenv() {
    try {

        notice.showToast({
            text: 'Installing python-dotenv',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install python-dotenv');
        console.log('8 - stdout:', stdout);

        InstallPytchat();

    } catch (e) {
        console.error(e);
    }
}

async function InstallPytchat() {
    try {

        notice.showToast({
            text: 'Installing pytchat',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install pytchat ');
        console.log('9 - stdout:', stdout);

        InstallBs4();

    } catch (e) {
        console.error(e);
    }
}

async function InstallBs4() {
    try {

        notice.showToast({
            text: 'Installing bs4',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install bs4 ');
        console.log('10 - stdout:', stdout);

        RestartBot()

    } catch (e) {
        console.error(e);
    }
}

async function RestartBot() {
    try {

        notice.showToast({
            text: 'Restarting Bot',
            type: 'info',
            showClose: 'true'
        });

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

                notice.showToast({
                    text: 'Python is installed in machine',
                    type: 'success',
                    showClose: 'true'
                });

                CheckForPip()
            } else {
                notice.showToast({
                    text: 'Please install Python, to get python go here: https://www.python.org/',
                    type: 'warning',
                    showClose: 'true'
                });

            }
        } catch (e) {
            console.error(e);
        }
    }
}

const initScript = new InitScript();
module.exports = initScript;