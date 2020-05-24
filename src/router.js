
module.exports = function(cfg, events){
  events.on("message-in", function(event){
    // dispatch to other systems as message-out event

		if (cfg.debug){
			console.log("message-in", event);
		}

		// dispatch to remotes
		events.emit("message-out", {
      // "discord", "irc"
			type: event.type,
      // "Discord", "IRC"
			name: event.name,
      // "somedude", "SomeDude@IRC", "SomeDude123@Discord"
      username: event.username,
      // null, "es", "main"
			channel: event.channel,
      // "give diamonds pls"
			message: event.message,

      // "me", "message"
      message_type: event.message_type,

      // null, "SomeDude@IRC"
      target_username: event.target_username,
      // null, "minetest", "IRC", "Discord"
      target_name: event.target_name
		});

  });

};
