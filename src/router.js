
module.exports = function(remotes, events){
  events.on("message-in", function(event){
    // dispatch to other systems as message-out event with their names

    remotes.forEach(remote => {
      if (event.name == remote.name){
        //skip self
        return;
      }

      // dispatch to remotes
      events.emit("message-out", {
        type: event.type,
        name: remote.name,
        username: event.username,
        channel: event.channel,
        message: event.message
      });
    });

    if (event.type != "minetest") {
      // dispatch to ingame too
      events.emit("message-out", {
        type: event.type,
        name: "minetest",
        username: event.username,
        channel: event.channel,
        message: event.message
      });
    }
  });

};
