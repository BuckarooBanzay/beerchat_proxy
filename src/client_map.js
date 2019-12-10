const irc_client = require('./irc_client');
const cfg = require("./config");

module.exports = new Promise(resolve => {
	var channels = {}; // name -> channelObj

	irc_client.on('registered', function() {
		Object.keys(cfg.channels).forEach(ingame_name => {
			const irc_name = cfg.channels[ingame_name];
			var channel = irc_client.channel("#" + irc_name);
			channel.join();
			channel.say(`beerchat_proxy connected! ingame-channel: ${ingame_name}`);
			channels[ingame_name] = channel;
		});

		resolve(channels);
	});
});
