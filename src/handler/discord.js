const Discord = require('discord.js');

module.exports = function(remote, events){
	const client = new Discord.Client();

	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);

		events.on("message-out", function(event){
			if (event.name == remote.name)
				//not meant for this remote, ignore
				return;

			if (remote.debug) {
				console.log("Discord-message-out", event);
			}

			const discord_channel_name = remote.channels[event.channel];
			if (!discord_channel_name){
				console.warn("discord, not mapped channel found", event.channel);
				return;
			}

			const channel = client.channels.find(ch => ch.name == discord_channel_name);
			if (channel) {
	      channel.send(`<${event.username}${event.type == "minetest" ? "" : "@" + event.name}> ${event.message}`);
	    } else {
				console.warn("discord, no channel found", discord_channel_name);
			}
		});
	});

	client.on('message', msg => {
		if (msg.author.bot){
			// ignore other bots
			return;
		}
		console.log("discord-bot", msg.channel.type, msg.channel.name, msg.content, msg.author.username);

		var ingame_channel = "";

		Object.keys(remote.channels).forEach(mapped_channel => {
			if (remote.channels[mapped_channel] == msg.channel.name)
				ingame_channel = mapped_channel;
		});

		// "dm" == direct
		if (msg.channel.type == "text"){
			events.emit("message-in", {
	      type: "discord",
	      name: remote.name,
	      username: msg.author.username,
	      channel: ingame_channel,
	      message: msg.content
	    });
		}
	});

	client.login(remote.token);
};
