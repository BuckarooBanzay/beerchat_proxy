const client = require('./irc_client');
const channel_map = require("./channel_map');

var channels = {}; // name -> channelObj


client.on('registered', function() {
	Object.keys(channel_map).forEach(name => {
		var channel = client.channel("#" + name);
		channel.join();
		channel.say(`beerchat_proxy connected! ingame-channel: ${name}`);
		channels[name] = channel;
	});
});

module.exports = channels;