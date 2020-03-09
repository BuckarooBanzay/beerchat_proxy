const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = require("../app");
const events = require("../events");

// mod -> web
app.post('/', jsonParser, function(req, res){

	// delegate to event bus
	events.emit("message-in", {
		type: "minetest",
		name: "minetest",
		username: req.body.username,
		channel: req.body.channel,
		message: req.body.message,
		target_name: req.body.target_name,
		target_username: req.body.target_username
	});

	res.end();
});
