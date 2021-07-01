const app = require("./app");
const enableWs = require('express-ws');

// enable websockets
enableWs(app);

// load minetest handler api's
require("./api/rx");
require("./api/tx");
require("./api/ws");
require("./api/reconnect");

const cfg = require("./config");
const events = require("./events");
const router = require("./router");

const handlers = {
  irc: require("./handler/irc"),
  discord: require("./handler/discord")
};

cfg.remotes.forEach(remote => {
  const handler = handlers[remote.type];

  console.log(`Setting up remote: ${remote.name} with type: ${remote.type}`);
  handler.init(remote, events);
});

events.on("reconnect", function(){
  //TODO
});

console.log("Starting message router");
router(cfg, events);

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
