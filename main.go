package main

import (
	"beerchat_proxy/core"
	"beerchat_proxy/discord"
	"beerchat_proxy/irc"
	"beerchat_proxy/minetest"
	"beerchat_proxy/types"
	"fmt"
	"net/http"
	"os"
)

func createRemote(remoteType types.RemoteType) types.RemoteChat {
	switch remoteType {
	case types.IRCType:
		return &irc.IRCRemoteChat{}
	case types.DiscordType:
		return &discord.DiscordRemoteChat{}
	case types.MinetestType:
		return &minetest.MinetestRemoteChat{}
	default:
		return nil
	}
}

func main() {
	file, err := os.Open("beerchat.json")
	if err != nil {
		panic(err.Error())
	}

	cfg, err := core.ParseConfig(file)
	if err != nil {
		panic(err.Error())
	}

	// name => remotechat-impl
	remoteMapping := map[string]types.RemoteChat{}

	ch := make(chan *types.Message, 100)

	for _, remoteConfig := range cfg.Remotes {
		remote := createRemote(remoteConfig.Type)
		if remote == nil {
			panic("Remote not found: " + remoteConfig.Type)
		}
		fmt.Printf("Initializing remote '%s'\n", remoteConfig.Name)
		err = remote.Initialize(ch, remoteConfig)
		if err != nil {
			panic(err)
		}
		remoteMapping[remoteConfig.Name] = remote
	}

	fmt.Printf("Initialized %d remotes\n", len(cfg.Remotes))

	http.ListenAndServe(fmt.Sprintf(":%d", cfg.Port), nil)
}
