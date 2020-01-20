
module.exports = function(cfg, events){
  events.on("message-in", function(event){
    // dispatch to other systems as message-out event

		if (cfg.debug){
			console.log("message-in", event);
		}

		// dispatch to remotes
		events.emit("message-out", {
			type: event.type,
			name: event.name,
			username: event.username,
			channel: event.channel,
			message: event.message
		});

  });

};
