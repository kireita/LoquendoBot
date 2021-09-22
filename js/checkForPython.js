const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function CheckForPip() {
    try {
        const { stdout, stderr } = await exec('python -m pip --version');
        console.log('5 - stdout:', stdout);
        // TODO : verify awnser
        if (stdout) {
            InstallPipenv()
        }
    } catch (e) {
        console.error(e);
    }
}

async function InstallPipenv() {
    try {
        const { stdout, stderr } = await exec('pip install pipenv');
        console.log('4 - stdout:', stdout);
        if (stdout) {
            CreateVirtualPythonEnvironment()
        }
    } catch (e) {
        console.error(e);
    }
}

async function CreateVirtualPythonEnvironment() {
    try {
        const { stdout, stderr } = await exec('pipenv install');
        console.log('3 - stdout:', stdout);
        if (stdout) {
            // TODO:do this shit
            // set value of HasPythonInstalled to true
            // restart app
        }
    } catch (e) {
        console.error(e);
    }
}

class InitScript {
    async CheckForPython() {
        try {
            const { stdout, stderr } = await exec('python --version');
            console.log('1 - stdout:', stdout);
            // TODO : verify awnser
            if (stdout) {
                CheckForPip()
            }
        } catch (e) {
            console.error(e);
        }
    }
}

const initScript = new InitScript();
module.exports = initScript;