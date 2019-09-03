const app = require("./app");

const client = require('./irc_client');

client.on('message', function(event) {
	// event = { message }
	console.log("message", event);//XXX
});

// web -> mod
app.get('/', function(req, res){
	setTimeout(() => res.json({}), 10000)
})
