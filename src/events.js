
/*
Events:


## "message"

{
  // source messaging system
  // "irc", "discord", "minetest", etc
  source_system: "irc"

  // the target channel/username
  target: "#main",

  // the source username
  source; "SomeDude",

  // the source channel: "#main", "#lag", etc
  source_channel: "",

  //the actual message
  message: "xyz",
}


*/

const EventEmitter = require("events");
module.exports = new EventEmitter();
