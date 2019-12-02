const IRC_CHANNEL = process.env.IRC_CHANNEL;

const irc_client = require("./irc_client");

module.exports = new Promise((resolve) => {
	irc_client.on('registered', function() {
		var channel = irc_client.channel("#" + IRC_CHANNEL);
		channel.join();
		channel.say(`beerchat_proxy connected!`);

		resolve(channel);
	});
});
