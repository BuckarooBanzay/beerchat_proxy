const app = require("./app");

// load minetest handler api's
require("./api/rx");
require("./api/tx");

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
  handler(remote, events);
});

console.log("Starting message router");
router(cfg, events);

app.listen(8080, () => console.log('Listening on http://127.0.0.1:8080'));
