const IRC = require('irc-framework');

module.exports = function(remote, events){
  const client = new IRC.Client();
  client.connect({
  	host: remote.host,
  	port: remote.port,
  	nick: remote.username,
  	password: remote.password,
  	auto_reconnect: true
  });

  if (remote.debug) {
  	client.on("debug", function(e){
  		console.log(e);
  	});
  }

  var channels = {}; // name -> channelObj

  // map channels
  client.on('registered', function() {
    Object.keys(remote.channels).forEach(ingame_name => {
      const irc_name = remote.channels[ingame_name];
      var channel = client.channel("#" + irc_name);
      channel.join();
      channel.say(`beerchat_proxy connected! ingame-channel: ${ingame_name}`);
      channels[ingame_name] = channel;
    });

    resolve(channels);
  });

  client.on('message', function(event) {
    if (remote.debug){
      console.log("irc-event-in", event)
    }

    if (event.type != "privmsg")
      return;

    //TODO: map ingame channel

    events.emit("message-in", {
      type: "irc",
      name: remote.name,
      username: event.nick,
      channel: event.target,
      message: event.message
    })
  });

  events.on("message-out", function(event){
    if (event.name != remote.name)
      //not meant for this remote, ignore
      return;

    if (remote.debug){
      console.log("irc-message-out", event)
    }

    const channel = channels[event.channel]
    if (channel) {
      channel.say(`<${event.username}> ${event.message}`)
    }
  });
}
