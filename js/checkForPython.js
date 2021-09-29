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

            InstallPipenv()
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

async function InstallPipenv() {
    try {

        notice.showToast({
            text: 'Installing pipenv',
            type: 'info',
            showClose: 'true'
        });

        const { stdout, stderr } = await exec('pip install pipenv');

        console.log('3 - stdout:', stdout);

        CreateVirtualPythonEnvironment()

    } catch (e) {
        console.error(e);
    }
}

async function CreateVirtualPythonEnvironment() {
    try {

        notice.showToast({
            text: 'Installing python modules, this might take a while, the app will restart when its done',
            type: 'info',
            autoClose: false,
            showClose: false
        });

        const { stdout, stderr } = await exec('pipenv install');

        console.log('4 - stdout:', stdout);

        config.SETTINGS.HAS_PYTHON_INSTALLED = '1';
        fs.writeFileSync('./config/Settings.ini', ini.stringify(config))

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