'use strict';

const Behavior = require('./Behavior');

module.exports = class Test extends Behavior {
    constructor(client, guild, args) {
        super(client, guild, {
            name: 'test',
            events: [
                ['message', message => {
                    if (message.content === 'test behaviors') {
                        message.channel.send('OK!');
                    }
                }]
            ]
        });
    }
}
