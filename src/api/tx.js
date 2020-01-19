
const app = require("../app");
const cfg = require("../config");
const events = require("../events");

var buffer = [];
events.on("message", e => buffer.push(e));


// web -> mod
app.get('/', function(req, res){

	// buffer full, flush
	if (buffer.length > 20){
		buffer = [];
	}

	function sendEvent(event){
		if (!event) {
			return;
		}

		var channel_name;
		var direct = false;

		Object.keys(cfg.channels).forEach(ingame_name => {
			const irc_name = cfg.channels[ingame_name];

			if (event.target == "#" + irc_name){
				channel_name = ingame_name;
			}
		});

		if (event.target == cfg.username){
			direct = true;
		}

		res.json({
			direct: direct,
			channel: channel_name,
			username: event.nick,
			message: event.message
		});
	}

	// buffered case
	if (buffer.length > 0){
		sendEvent(buffer.shift());
		return;
	}

	// timeout handle
	var handle;

	// async event case
	function evtHandler(){
		clearTimeout(handle);
		sendEvent(buffer.shift());
	}

	// timeout case
	handle = setTimeout(() => {
		res.json({});
		events.removeListener("message", evtHandler);
	}, 20000);

	events.once("message", evtHandler);
});
