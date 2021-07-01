const app = require("../app");
const events = require("../events");

// mod -> web
app.post('/reconnect', function(req, res){
	events.emit("reconnect", {});
	res.end();
});
