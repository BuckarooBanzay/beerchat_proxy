
const app = require("../app");
const events = require("../events");

var buffer = [];
events.on("message-out", e => {
	if (e.name != "minetest")
		buffer.push(e);
});


// web -> mod
app.get('/', function(req, res){

	// buffer full, flush
	if (buffer.length > 50){
		buffer = [];
	}

	// buffered case
	if (buffer.length > 0){
		res.json(buffer);
		buffer = [];
		return;
	}

	// timeout handle
	var handle;

	// async event case
	function evtHandler(e){
		if (e.name != "minetest"){
			clearTimeout(handle);
			res.json(buffer);
			buffer = [];
		}
	}

	// timeout case
	handle = setTimeout(() => {
		res.json([]);
		events.removeListener("message-out", evtHandler);
	}, 20000);

	events.once("message-out", evtHandler);
});
