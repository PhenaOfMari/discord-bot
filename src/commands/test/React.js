'use strict';

const { Command } = require('discord.js-commando');

module.exports = class React extends Command {
    constructor(client) {
        super(client, {
            name: 'react',
            group: 'test',
            memberName: 'react',
            description: 'Reacts to the command with a ✅.',
            examples: ['react']
        });
    }

    run(message) {
        message.react('✅');
    }
}
