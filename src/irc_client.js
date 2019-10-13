
const IRC = require('irc-framework');

const IRC_HOST = process.env.IRC_HOST
const IRC_USERNAME = process.env.IRC_USERNAME
const IRC_PASSWORD = process.env.IRC_PASSWORD
const ENABLE_DEBUG = process.env.ENABLE_DEBUG


const client = new IRC.Client();
client.connect({
	host: IRC_HOST,
	port: 6667,
	nick: IRC_USERNAME,
	auto_reconnect: true
});

if (ENABLE_DEBUG == "true") {
	client.on("debug", function(e){
		console.log(e)
	})
}

module.exports = client;
