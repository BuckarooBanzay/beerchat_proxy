module.exports = {
	"remotes": [{
		"debug": true,
		"announce_channel": false,
		"name": "IRC",
		"type": "irc",
		"host": "irc.libera.chat",
		"username": "beerchat-test",
		"password": "dummy",
		"system_channel": "main",
		"channels": {
			"main": "beerchat-test"
		}
	},{
		"debug": true,
		"announce_channel": false,
		"name": "Discord",
		"type": "discord",
		"token": process.env.BEERCHAT_DISCORD_TEST_TOKEN,
		"system_channel": "main",
		"channels": {
			"main": "main"
		}
	}]
};