#!/usr/bin/env node

'use strict';
const builder = require('electron-builder');
const fs = require('fs');
const packagejson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'build app'
});
parser.addArgument(
    ['--target'], {
        help: 'select win, mac, linux, all(parallel build)',
        type: 'string',
        defaultValue: 'all'
    }
);

var args = parser.parseArgs();
if (args.target == 'all') {
    args.target = 'win,mac,linux'
}

for (var target of args.target.split(',')) {
    switch (target) {
        case 'win':
            builder.build({
                platform: 'win',
                config: {
                    'appId': `com.example.${packagejson.name}`,
                    'win': {
                        'target': 'zip',
                        "icon": "build/icons/icon.ico",
                    },
                },
            });
            break;
        case 'mac':
            builder.build({
                platform: 'mac',
                config: {
                    'appId': `com.example.${packagejson.name}`,
                    'mac': {
                        'target': 'zip',
                        'icon': 'build/icons/icon.icns',
                    },
                },
            });
            break;
        case 'linux':
            builder.build({
                platform: 'linux',
                config: {
                    'appId': `com.example.${packagejson.name}`,
                    'linux': {
                        'target': 'zip',
                        'icon': 'build/icons/icon.icns',
                    },
                },
            });
            break;
        default:
            console.log("Unknown target '%s'", target);
            console.log("select win, mac, linux, all");
            break;
    }
}
