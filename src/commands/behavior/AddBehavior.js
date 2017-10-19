'use strict';

const { Command } = require('discord.js-commando');
const Behavior = require('../../behaviors/Behavior');

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
        let behaviorName = args[0] || '';
        let behaviorArgs = args.slice(1);
        let BehaviorClass = this.client.registry.behaviors[behaviorName];

        let channel = message.channel;
        if (!BehaviorClass || !BehaviorClass instanceof Behavior) {
            channel.send('The behavior `' + behaviorName + '` could not be found.');
            return;
        }

        let guild = channel.guild;
        if (!guild.behaviors) {
            guild.behaviors = {};
        }

        let behaviors = guild.behaviors;
        let behavior = behaviors[behaviorName];
        if (behavior) {
            channel.send('The behavior `' + behaviorName + '` is already active on this guild.');
        } else {
            behavior = new BehaviorClass(this.client, guild.id, behaviorArgs);
            behavior.start();
            behaviors[behaviorName] = behavior;
            channel.send('The behavior `' + behaviorName + '` has been activated on this guild.');
        }
    }
}
