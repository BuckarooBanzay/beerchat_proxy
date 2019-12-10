const cfg = require("./config");
const IRC = require('irc-framework');

const client = new IRC.Client();
client.connect({
	host: cfg.host,
	port: cfg.port,
	nick: cfg.username,
	password: cfg.password,
	auto_reconnect: true
});

if (cfg.debug) {
	client.on("debug", function(e){
		console.log(e);
	});
}

module.exports = client;
