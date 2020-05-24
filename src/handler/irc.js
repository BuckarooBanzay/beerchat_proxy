const IRC = require('irc-framework');

module.exports = function(remote, events){
  const client = new IRC.Client();
  client.connect({
  	host: remote.host,
  	port: remote.port,
  	nick: remote.username,
  	password: remote.password,
  	auto_reconnect: true,
    auto_reconnect_wait: 10000,
    auto_reconnect_max_retries: 9999
  });

  if (remote.debug) {
  	client.on("debug", function(e){
  		console.log(e);
  	});
  }

  var channels = {}; // name -> channelObj

  // map channels
  client.on('registered', function() {
		let delay = 5000;
    Object.keys(remote.channels).forEach(ingame_name => {
			setTimeout(function(){
	      const irc_name = remote.channels[ingame_name];
	      var channel = client.channel("#" + irc_name);
	      channel.join();
	      channel.say(`beerchat_proxy connected! ingame-channel: ${ingame_name}`);
	      channels[ingame_name] = channel;
			}, delay);
			delay += 2000;
    });
  });

  client.on('message', function(event) {
    if (remote.debug){
      console.log("irc-event-in", event);
    }

    if (event.type != "privmsg")
      return;

    if (event.target == remote.username){
      //PM from IRC received
      events.emit("message-in", {
        type: "discord",
        name: remote.name,
        username: event.nick,
        message: event.message,
        target_name: "minetest"
      });

      return;
    }

    var channel = "";
    Object.keys(remote.channels).forEach(ingame_channel => {
      const irc_channel = remote.channels[ingame_channel];
      if (irc_channel == event.target.substr(1)){
        channel = ingame_channel;
      }
    });

    events.emit("message-in", {
      type: "irc",
      name: remote.name,
      username: event.nick,
      channel: channel,
      message: event.message
    });
  });

  events.on("message-out", function(event){
    if (event.name == remote.name)
      //not meant for this remote, ignore
      return;

    if (event.target_name != null && event.target_name != remote.name){
			// target_name set but not for this
			return;
		}

    if (remote.debug){
      console.log("irc-message-out", event);
    }

    let channel;

    if (event.target_username != null){
      // send PM to IRC user
      client.say(event.target_username, event.message);

    } else if (event.channel != null) {
			// channel name sent, map to config channels
			channel = channels[event.channel];

		} else {
			// no channel sent, assuming system message
			channel = channels[remote.system_channel];

    }

    if (channel) {
			if (event.username){
        // player message
        if (event.message_type == "me"){
          // /me message
          channel.say(`* ${event.username}${event.type == "minetest" ? "" : "@" + event.name} ${event.message}`);
        } else {
          // normal message
          channel.say(`<${event.username}${event.type == "minetest" ? "" : "@" + event.name}> ${event.message}`);
        }
			} else {
        // system message
				channel.say(`${event.message}`);
			}
    }
  });
};
