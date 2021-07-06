package minetest

import (
	"beerchat_proxy/types"
	"fmt"
)

type MinetestRemoteChat struct {
	bus types.EventBus
}

func (remote *MinetestRemoteChat) Initialize(bus types.EventBus, cfg *types.RemoteConfig) error {
	//TODO: setup http endpoints
	remote.bus = bus
	return nil
}

func (remote *MinetestRemoteChat) SendMessage(msg *types.Message) error {
	fmt.Printf("irc, Would send %s on channel %s\n", msg.Text, msg.Channel)
	return nil
}
