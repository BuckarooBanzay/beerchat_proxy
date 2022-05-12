const app = require("../app");
const events = require("../events");

app.ws("/api/ws", function(ws){
	ws.on('message', msg => {
		const data = JSON.parse(msg);
		events.emit(data.event, data.data);
	});

	function inlistener(msg){
		ws.send(JSON.stringify({ event: "message-in", data: msg }));
	}

	events.on("message-in", inlistener);

	ws.on('close', () => {
		console.log('ws WebSocket was closed');
		events.off("message-in", inlistener);
	});
});
