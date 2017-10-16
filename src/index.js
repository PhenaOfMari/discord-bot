'use strict';

const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '!',
    disableEveryone: true,
    owner: 'User ID goes here!',
    unknownCommandResponse: false
});

client.registry
    .registerDefaults()
    .registerGroups([
        ['behavior', 'Commands to manipulate behaviors.'],
        ['test', 'Test commands!']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.registry.behaviors = {
    test: require('./behaviors/Test')
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.login('Bot token goes here!');
