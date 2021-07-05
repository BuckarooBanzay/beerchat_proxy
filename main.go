package main

import (
	"beerchat_proxy/discord"
	"beerchat_proxy/irc"
	"beerchat_proxy/types"
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func createRemote(remoteType string) types.RemoteChat {
	switch remoteType {
	case "irc":
		return &irc.IRCRemoteChat{}
	case "discord":
		return &discord.DiscordRemoteChat{}
	default:
		return nil
	}
}

type MainEventBus struct {
	remoteMapping map[string]types.RemoteChat
}

func (bus *MainEventBus) OnMessageReceived(remote types.RemoteChat, msg *types.Message) {

	for _, outRemote := range bus.remoteMapping {
		// same remote, don't send it
		if outRemote == remote {
			continue
		}

		err := outRemote.SendMessage(msg)
		if err != nil {
			fmt.Printf("Could not send message: %s", err.Error())
		}
	}
}

func main() {
	cfgfile, err := ioutil.ReadFile("beerchat.json")
	if err != nil {
		panic(err.Error())
	}

	cfg := &types.Config{}
	err = json.Unmarshal(cfgfile, cfg)
	if err != nil {
		panic(err.Error())
	}

	// name => remotechat-impl
	remoteMapping := map[string]types.RemoteChat{}

	for _, remoteConfig := range cfg.Remotes {
		remote := createRemote(remoteConfig.Type)
		if remote == nil {
			panic("Remote not found: " + remoteConfig.Type)
		}
		remoteMapping[remoteConfig.Name] = remote
	}

	fmt.Println("ok")
}
