module.exports = {
	"remotes": [{
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
		"name": "Discord",
		"type": "discord",
		"token": process.env.BEERCHAT_DISCORD_TEST_TOKEN,
		"system_channel": "main",
		"channels": {
			"main": "pandorabox-test"
		}
	}]
};