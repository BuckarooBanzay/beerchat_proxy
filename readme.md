
Beerchat proxy application

Relay for minetest-ingame / IRC and Discord

![](https://github.com/minetest-beerchat/beerchat_proxy/workflows/jshint/badge.svg)
![](https://github.com/minetest-beerchat/beerchat_proxy/workflows/docker/badge.svg)


## Local Testing

```
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"channel":"main","playername":"somedude","message":"rant about lag!"}' \
 http://127.0.0.1:8080/
```

## Configuration

beerchat.json
```json
{
  "debug": true,

  "remotes": [{
    "name": "IRC",
    "type": "irc",
		"debug": true,
    "host": "chat.freenode.net",
    "username": "pandorabot_test",
    "password": "my-password",
		"system_channel": "main",
    "channels": {
      "main": "pandorabox-test"
    }
  },{
    "name": "Discord",
    "type": "discord",
		"debug": true,
		"token": "the-discord-token",
		"system_channel": "main",
    "channels": {
      "main": "test"
    }
  }]
}

}
```
