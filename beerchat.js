module.exports = {
	"remotes": [{
		"debug": false,
		"announce_channel": false,
		"name": "IRC",
		"type": "irc",
		"host": "irc.libera.chat",
		"username": "beerchat-test",
		"password": "dummy",
		"system_channel": "main",
		"channels": {
			"main": "pandorabox-test"
		}
	},{
		"debug": false,
		"announce_channel": false,
		"name": "Discord",
		"type": "discord",
		"token": process.env.BEERCHAT_DISCORD_TEST_TOKEN,
		"system_channel": "main",
		"channels": {
			"main": "pandorabox-test"
		}
	}]
};