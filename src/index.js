const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const irc = require('irc');

const app = express();
app.use(express.static('public'));
app.disable('etag');


const IRC_HOST = process.env.IRC_HOST
const IRC_CHANNEL = process.env.IRC_CHANNEL
const IRC_USERNAME = process.env.IRC_USERNAME
const IRC_PASSWORD = process.env.IRC_PASSWORD

const client = new irc.Client(IRC_HOST, IRC_USERNAME, {
    channels: ["#" + IRC_CHANNEL],
    password: IRC_PASSWORD,
    autoRejoin: true,
    autoConnect: true,
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

// mod -> web
app.post('/api/message', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	client.say("#" + IRC_CHANNEL, `<${req.body.playername}> ${message}`);
	res.end();
});

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
