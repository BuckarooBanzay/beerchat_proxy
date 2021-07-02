const app = require("./app");
const enableWs = require('express-ws');

// enable websockets
enableWs(app);

// load minetest handler api's
require("./api/rx");
require("./api/tx");
require("./api/ws");
require("./api/shutdown");

const cfg = require("./config");
const events = require("./events");
const router = require("./router");

const handlers = {
  irc: require("./handler/irc"),
  discord: require("./handler/discord")
};

const instances = [];
cfg.remotes.forEach(remote => {
  const Handler = handlers[remote.type];
  const instance = new Handler();

  console.log(`Setting up remote: ${remote.name} with type: ${remote.type}`);
  instance.init(remote, events);
  instances.push(instance);
});

console.log("Starting message router");
router(cfg, events);

const server = app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));

events.on("shutdown", function(){
  // close http server
  server.close();
  // close clients
  instances.forEach(i => i.destroy());
  // forcibly quit
  process.exit(0);
});