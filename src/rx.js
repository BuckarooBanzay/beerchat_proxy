const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = require("./app");

const client_map = require("./client_map");

// mod -> web
app.post('/', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	
	if (!req.body.channel)
		return;

	const channel = client_map[req.body.channel];
	if (channel) {
		channel.say(
			(req.body.playername ? `<${req.body.playername}> ` : "") +
			req.body.message
		);
	}
	res.end();
});