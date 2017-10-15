'use strict';

const { Command } = require('discord.js-commando');
const { head, tail, get, set } = require('lodash');

module.exports = class AddBehavior extends Command {
    constructor(client) {
        super(client, {
            name: 'add-behavior',
            group: 'behavior',
            memberName: 'add-behavior',
            description: 'Activates a behavior on the bot.',
            examples: ['!add-behavior Example'],
            argsType: 'multiple'
        });
    }

    run(message, args) {
        var behaviorName = head(args);
        var behaviorArgs = tail(args);
        var BehaviorClass = require('../../behaviors/' + behaviorName);

        var channel = message.channel;
        var guild = channel.guild;
        if (!guild.behaviors) {
            guild.behaviors = {};
        }

        var behaviors = guild.behaviors;
        var behavior = get(behaviors, behaviorName);
        if (behavior) {
            channel.send('The behavior `' + behaviorName + '` is already active on this guild.');
        } else if (behaviorName !== 'Behavior' && BehaviorClass) {
            behavior = new BehaviorClass(this.client, guild, behaviorArgs);
            behavior.start();
            set(behaviors, behaviorName, behavior);
        } else {
            channel.send('The behavior `' + behaviorName + '` could not be found.');
        }
    }
}
