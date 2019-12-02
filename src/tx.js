
const IRC_CHANNEL = process.env.IRC_CHANNEL;
const IRC_USERNAME = process.env.IRC_USERNAME;

const app = require("./app");
const client = require('./irc_client');
const EventEmitter = require("events");

var buffer = [];
var events = new EventEmitter();

client.on('message', function(event) {
	if (event.type != "privmsg")
		return;

	buffer.push(event);
	events.emit("message", event);
});


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
		
		var channel;
		var direct = false;

		if (event.target == "#" + IRC_CHANNEL){
			channel = "main";
		}

		if (event.target == IRC_USERNAME){
			direct = true;
		}

		res.json({
			direct: direct,
			channel: channel,
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
