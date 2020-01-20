
module.exports = function(remotes, events){
  events.on("message-in", function(event){
    // dispatch to other systems as message-out event with their names

    remotes.forEach(remote => {
      if (event.name == remote.name){
        //skip self
        return;
      }

      events.emit("message-out", {
        type: event.type,
        name: remote.name,
        username: event.username,
        channel: event.channel,
        message: event.message
      })
    });
  });

}
