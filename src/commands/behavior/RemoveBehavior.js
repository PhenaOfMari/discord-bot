'use strict';

const { Command } = require('discord.js-commando');

module.exports = class RemoveBehavior extends Command {
    constructor(client) {
        super(client, {
            name: 'remove-behavior',
            group: 'behavior',
            memberName: 'remove-behavior',
            description: 'Deactivates a behavior on the bot.',
            examples: ['!remove-behavior Example']
        });
    }

    run(message, behaviorName) {
        let channel = message.channel;
        let behaviors = channel.guild.behaviors;
        let behavior = behaviors[behaviorName];
        if (behavior) {
            behavior.stop();
            delete behaviors[behaviorName];
            channel.send('The behavior `' + behaviorName + '` has been deactivated on this guild.');
        } else {
            channel.send('The behavior `' + behaviorName + '` has not been activated on this guild.');
        }
    }
}
