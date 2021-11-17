
Beerchat proxy application

Relay for minetest-ingame / IRC and Discord

![](https://github.com/minetest-beerchat/beerchat_proxy/workflows/docker/badge.svg)

# Example config

beerchat.json
```json
{
	"remotes": [{
		"debug": false,
		"announce_channel": false,
		"name": "IRC",
		"type": "irc",
		"host": "irc.libera.chat:6667",
		"username": "beerchat-test",
		"password": "ENV:MYPASS",
		"system_channel": "main",
		"channels": {
			"main": "pandorabox-test"
		}
	}]
}
```

Environment variables can be injected into the `password` field with the `ENV:VARNAME` syntax.