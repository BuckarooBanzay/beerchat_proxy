const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = require("../app");
const client_map = require("../client_map");

// mod -> web
app.post('/', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	client_map.then(channels => {
		if (!req.body.message){
			return;
		}

		const channel = channels[req.body.source_channel];
		const main_channel = channels.main;

		if (channel){
			// player message
			channel.say(
				(req.body.source ? `<${req.body.source}> ` : "") +
				req.body.message
			);

		}
	})
	.catch(e => console.log(e));

	res.end();
});
