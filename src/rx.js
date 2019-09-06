const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = require("./app");

const channel = require("./channel");

// mod -> web
app.post('/', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	
	if (!req.body.channel)
		return;

	channel.then(ch => {
		ch.say(
			(req.body.playername ? `<${req.body.playername}> ` : "") +
			req.body.message
		);
	});

	res.end();
});