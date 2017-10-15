'use strict';

const { Command } = require('discord.js-commando');

module.exports = class Reply extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'test',
            memberName: 'reply',
            description: 'Replies to the command with a "Hello!".',
            examples: ['reply']
        });
    }

    run(message) {
        message.channel.send('Hello!');
    }
}
