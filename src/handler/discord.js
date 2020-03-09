const Discord = require('discord.js');

module.exports = function(remote, events){
	const client = new Discord.Client({
		autoReconnect: true
	});

	client.on('ready', e => {
		console.error("error", e);
	});

	client.on('disconnect', e => {
		console.error("disconnect", e);
	});

	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);

		events.on("message-out", function(event){
			if (event.name == remote.name)
				// not meant for this remote, ignore
				// source == destination
				return;

			if (event.target_name != null && event.target_name != remote.name){
				// target_name set but not for this
				return
			}

			if (remote.debug) {
				console.log("Discord-message-out", event);
			}

			let discord_channel_name;

			if (event.target_username != null){
				// send PM to discord user
				const user = client.users.cache.find(u => u.username == event.target_username);
				if (user != null){
					user.send(event.message);
				}

			} else if (event.channel != null) {
				// channel name sent, map to config channels
				discord_channel_name = remote.channels[event.channel];

			} else {
				// no channel sent, assuming system message
				discord_channel_name = remote.channels[remote.system_channel];

			}

			if (!discord_channel_name){
				return;
			}

			const channel = client.channels.cache.find(ch => ch.name == discord_channel_name);
			if (channel) {
				if (event.username){
					channel
						.send(`<${event.username}${event.type == "minetest" ? "" : "@" + event.name}> ${event.message}`)
						.catch(e => console.warn("discord send error", e));
				} else {
					channel
						.send(`${event.message}`)
						.catch(e => console.warn("discord send error", e));
				}

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

		if (msg.channel.type == "dm") {
			//Direct message
			events.emit("message-in", {
	      type: "discord",
	      name: remote.name,
	      username: msg.author.username,
	      message: msg.cleanContent,
				target_name: "minetest"
			})

			return;
		}

		var ingame_channel = "";
		Object.keys(remote.channels).forEach(mapped_channel => {
			if (remote.channels[mapped_channel] == msg.channel.name)
				ingame_channel = mapped_channel;
		});

		if (msg.channel.type == "text") {
			// broadcast/channel message
			events.emit("message-in", {
	      type: "discord",
	      name: remote.name,
	      username: msg.author.username,
	      channel: ingame_channel,
	      message: msg.cleanContent
	    });
		}
	});

	client.login(remote.token)
		.catch(e => console.error("login", e));
};
