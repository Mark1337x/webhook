const Command = require("../handlers/command.js");

module.exports = class extends Command {
    constructor(client, filePath) {
        super(client, filePath, {
            name: "help",
        });
    }

    execute(message) {
        //message.author.send("```mg!create <time-in-seconds> <giveaway-title>\nmg!delete <giveaway-id>```");
        message.channel.send("**Ez még nincs megcsinálva**");
    }
};