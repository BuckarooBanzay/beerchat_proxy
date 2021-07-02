const app = require("../app");
const events = require("../events");

// mod -> web
app.post('/shutdown', function(req, res){
	events.emit("shutdown", {});
	res.end();
});
