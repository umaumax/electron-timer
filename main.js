const electron = require('electron');
const {
    app
} = electron;
const {
    BrowserWindow
} = electron;

const ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'floating window timer app'
});
parser.addArgument(
    ['--debug', '--verbose'], {
        help: 'debug mode',
        type: 'int',
        defaultValue: 0
    }
);
parser.addArgument(
    ['-n', '--duration'], {
        help: 'time',
        type: 'int',
        defaultValue: 300
    }
);
var args = parser.parseArgs();
let timerTime = parseInt(args.duration);

let win;

function createWindow() {
    win = new BrowserWindow({
        title: 'electron timer',
        width: !args.debug ? 400 : 1000,
        height: !args.debug ? 140 : 800,
        alwaysOnTop: true,
    });
    if (args.debug) {
        win.openDevTools();
    }

    win.loadURL(`file://${__dirname}/app/index.html`);

    win.on('closed', () => {
        win = null;
    });

    win.webContents.on('did-finish-load', () => {
        win.webContents.send('timer-init', timerTime);
        win.webContents.send('timer-change', timerTime);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    // FYI:
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    // app.quit();
    // }

    app.quit();
});

app.on('activate', () => {
    // FYI:
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
