package main

import (
	"beerchat_proxy/core"
	"beerchat_proxy/discord"
	"beerchat_proxy/irc"
	"beerchat_proxy/minetest"
	"beerchat_proxy/types"
	"os"
	"os/signal"
	"syscall"

	"github.com/sirupsen/logrus"
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
			logrus.Debugf("Could not send message: %s", err.Error())
		}
	}
}

func main() {
	logrus.SetLevel(logrus.DebugLevel)
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

	bus := &MainEventBus{
		remoteMapping: remoteMapping,
	}

	for _, remoteConfig := range cfg.Remotes {
		remote := createRemote(remoteConfig.Type)
		if remote == nil {
			panic("Remote not found: " + remoteConfig.Type)
		}
		logrus.Debugf("Initializing remote '%s'\n", remoteConfig.Name)
		err = remote.Initialize(bus, remoteConfig)
		if err != nil {
			panic(err)
		}
		remoteMapping[remoteConfig.Name] = remote
	}

	minetestRemote := &minetest.MinetestRemoteChat{}
	minetestRemote.Initialize(bus, nil)
	remoteMapping["minetest"] = minetestRemote

	logrus.Debugf("ok")

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
	<-sig
	logrus.Debugf("exiting")
}
