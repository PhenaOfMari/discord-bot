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
    .registerDefaultTypes()
    .registerGroups([
        ['behavior', 'Commands to manipulate behaviors.'],
        ['test', 'Test commands!']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    console.log('I am ready!');
});

client.login('Bot token goes here!');
