const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = require("./app");

const channel = require("./channel");

// mod -> web
app.post('/', jsonParser, function(req, res){

	// req.body = { channel = "", playername = "", message = "" }
	channel
	.then(ch => {
		if (!req.body.message){
			return;
		}

		if (req.body.channel == "main"){
			// player message
			ch.say(
				(req.body.playername ? `<${req.body.playername}> ` : "") +
				req.body.message
			);
		} else if (!req.body.channel) {
			// system message
			ch.say(req.body.message);
		}

	})
	.catch(e => console.log(e));

	res.end();
});
