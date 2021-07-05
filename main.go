package main

import (
	"beerchat_proxy/irc"
	"beerchat_proxy/types"
	"fmt"
	"time"
)

type DummyEventBus struct{}

func (d *DummyEventBus) OnMessageReceived(remote types.RemoteChat, channel, msg string) {
	fmt.Printf("Eventbus received msg %s on channel %s\n", msg, channel)
}

func main() {
	fmt.Println("ok")

	bus := &DummyEventBus{}
	irc := &irc.IRCRemoteChat{}
	irc.Initialize(bus)
	irc.SendMessage("main", "irc-out")

	time.Sleep(2 * time.Second)
}
