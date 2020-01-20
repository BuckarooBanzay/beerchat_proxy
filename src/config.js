
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('beerchat.json', 'utf8'));

module.exports = cfg;
