
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('beerchat.json', 'utf8'));

// Default config
module.exports = Object.assign({
  host: "chat.freenode.net",
  port: 6667,
  username: "beerchat_test",
  password: "xyz",
  debug: false,
  channels: {
    main: "beerchat-test"
  }
}, cfg);
