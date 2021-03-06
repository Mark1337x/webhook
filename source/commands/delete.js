const Command = require("../handlers/command.js");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "delete",
            aliases: ["stop", "end"]
        });
    }

    execute(message) {
        if(!message.guildAdmin && !message.globalAdmin) return message.channel.send('Invalid Permissions. `MANAGE_SERVER` permission or `MG Admin` role required.');

        const match = /(?:delete|stop|end)(?:\s+(?:<#)?(\d{17,20})(?:>)?)?(?:\s+(\d+))/i.exec(message.content);

        if (!match) return message.channel.send(`Invalid Command Usage: \`${this.client.config.prefix}delete [channel-mention|channel-id] <giveaway-number>\``);

        const channel = match[1] ? message.guild.channels.get(match[1]) || message.channel : message.channel;

        if (this.client.giveawayCache.filter(giveaway => giveaway.channel.id === channel.id).size <= 0) return message.channel.send(`Nincs jelenleg futó nyereményjáték **${channel.name}** szobában!`);

        const a = this.client.giveawayCache.get(`${channel.id}-${match[2]}`);

        if(!a) return message.channel.send(`Hiba! Nincs ilyen ID-vel nyereményjáték!`);

        clearInterval(a.interval);

        a.msg.delete();

        this.client.giveawayCache.delete(`${channel.id}-${match[2]}`);

        message.channel.send(`Nyereményjáték **${match[2]}** törölve lett.`);
    }
};
