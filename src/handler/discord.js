const Discord = require('discord.js');

module.exports = function(remote){
  Object.keys(remote.channels).forEach(ingame_channel => {
    const token = remote.channels[ingame_channel];
    const client = new Discord.Client();

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', msg => {
      if (msg.content === 'ping') {
        msg.reply('Pong!');
      }
    });

    client.login(token);
  });
};
