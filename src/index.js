const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const IRC = require('irc-framework');

const app = express();
app.use(express.static('public'));
app.disable('etag');


const IRC_HOST = process.env.IRC_HOST
const IRC_CHANNEL = process.env.IRC_CHANNEL
const IRC_USERNAME = process.env.IRC_USERNAME
const IRC_PASSWORD = process.env.IRC_PASSWORD

const client = new IRC.Client();
client.connect({
	host: IRC_HOST,
	port: 6667,
	nick: IRC_USERNAME,
	auto_reconnect: true
});

var channel;

client.on('registered', function() {
	channel = client.channel("#" + IRC_CHANNEL);
	channel.join();
	channel.say("beerchat_proxy connected!");
});

// mod -> web
app.post('/api/message', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	if (channel) {
		channel.say(
			(req.body.playername ? `<${req.body.playername}> ` : "") +
			req.body.message
		);
	}
	res.end();
});

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
