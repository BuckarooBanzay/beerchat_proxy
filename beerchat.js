module.exports = {
	"remotes": [{
		"debug": true,
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
		"debug": true,
		"name": "Discord",
		"type": "discord",
		"token": process.env.BEERCHAT_DISCORD_TEST_TOKEN,
		"system_channel": "main",
		"channels": {
			"main": "pandorabox-test"
		}
	}]
};