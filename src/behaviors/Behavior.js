'use strict';

const { spread } = require('lodash');

module.exports = class Behavior {
    constructor(client, guild) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'guild', { value: guild });

        this.listeners = [];
    }

    start() {
        this.listeners.forEach(listenerPair => {
            var client = this.client;
            client.on.apply(client, listenerPair);
        })
    }

    stop() {
        this.listeners.forEach(listenerPair => {
            var client = this.client;
            client.removeListener.apply(client, listenerPair);
        })
    }
}
