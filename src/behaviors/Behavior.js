'use strict';

const {
    Channel,
    Collection,
    Emoji,
    Guild,
    GuildMember,
    Message,
    MessageReaction,
    Role
} = require('discord.js');

module.exports = class Behavior {
    constructor(client, guildId, options) {
        Object.defineProperty(this, 'client', { value: client });
        Object.defineProperty(this, 'guildId', { value: guildId });

        this.name = options.name;

        let events = options.events || [];
        this.listeners = events.map(this.scopeEvent, this);
    }

    scopeEvent(eventPair) {
        let eventName = eventPair[0];
        let listener = eventPair[1];
        return [eventName, (...args) => {
            if (isWithinGuild(this.guildId, ...args)) {
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
};

function isWithinGuild(guildId, firstArg) {
    let eventGuildId;
    if (firstArg) {
        let arg = firstArg;
        if (arg instanceof Collection) {
            arg = arg.first();
        }
        if (arg instanceof Array) {
            arg = arg[0];
        }
        if (arg instanceof MessageReaction) {
            arg = arg.message;
        }
        if (isInstanceOf(arg, Channel, Emoji, GuildMember, Message, Role)) {
            arg = arg.guild;
        }
        if (arg instanceof Guild) {
            eventGuildId = arg.id;
        }
    }
    return guildId === eventGuildId;
};

function isInstanceOf(object, ...classes) {
    return classes.some(classType => {
        return object instanceof classType;
    });
};
