'use strict';

const VALIDATION = {
    message: function(message) {
        return message.channel.guild === this.guild;
    }
}

module.exports = class Behavior {
    constructor(client, guild, options) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'guild', { value: guild });

        this.name = options.name;

        let events = options.events || [];
        this.listeners = events.map(this.scopeEvent, this);
    }

    scopeEvent(eventPair) {
        let eventName = eventPair[0];
        let listener = eventPair[1];
        return [eventName, (...args) => {
            let isValid = VALIDATION[eventName] || function() { return true; };
            if (isValid.apply(this, args)) {
                listener(...args);
            }
        }]
    }

    start() {
        this.listeners.forEach(listenerPair => {
            this.client.on(...listenerPair);
        })
    }

    stop() {
        this.listeners.forEach(listenerPair => {
            this.client.removeListener(...listenerPair);
        })
    }
}
