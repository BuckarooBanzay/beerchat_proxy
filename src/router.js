
module.exports = function(remotes, events){
  events.on("message-in", function(event){
    // dispatch to other systems as message-out event with their names
  });

}
