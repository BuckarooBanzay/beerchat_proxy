
const IRC = require('irc-framework');

const IRC_HOST = process.env.IRC_HOST
const IRC_USERNAME = process.env.IRC_USERNAME
const IRC_PASSWORD = process.env.IRC_PASSWORD

const client = new IRC.Client();
client.connect({
	host: IRC_HOST,
	port: 6667,
	nick: IRC_USERNAME,
	auto_reconnect: true
});

module.exports = client