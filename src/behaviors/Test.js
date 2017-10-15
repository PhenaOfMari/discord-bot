'use strict';

const Behavior = require('./Behavior');

module.exports = class Test extends Behavior {
    constructor(client, guild, args) {
        super(client, guild);

        this.listeners = [
            ['message', message => {
                var channel = message.channel;
                var inGuild = channel.guild === this.guild;
                if (inGuild && message.content === 'test behaviors') {
                    channel.send('OK!')
                }
            }]
        ];
    }
}
