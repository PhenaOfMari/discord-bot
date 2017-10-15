'use strict';

const { Command } = require('discord.js-commando');
const { get, unset } = require('lodash');

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
        var channel = message.channel;
        var behaviors = channel.guild.behaviors;
        var behavior = get(behaviors, behaviorName);
        if (behavior) {
            behavior.stop();
            unset(behaviors, behaviorName);
        } else {
            channel.send('The behavior `' + behaviorName + '` has not been activated on this guild.');
        }
    }
}
