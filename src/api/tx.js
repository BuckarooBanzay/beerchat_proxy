
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

		Object.keys(cfg.channels).forEach(ingame_name => {
			const irc_name = cfg.channels[ingame_name];

			if (event.target == "#" + irc_name){
				channel_name = ingame_name;
			}
		});

		res.json({
			source_system: event.source_system,
			target: channel_name, // mapped channel name: "#main", "#lag"
			source: event.nick, // "somedude"
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
