package irc

import (
	"beerchat_proxy/types"
	"fmt"
	"time"
)

type IRCRemoteChat struct {
	bus types.EventBus
}

func (irc *IRCRemoteChat) Initialize(bus types.EventBus) error {
	irc.bus = bus
	go func() {
		time.Sleep(1 * time.Second)
		bus.OnMessageReceived(irc, "main", "irc-in")
	}()
	return nil
}

func (irc *IRCRemoteChat) SendMessage(channel, msg string) error {
	fmt.Printf("Would send %s on channel %s\n", msg, channel)
	return nil
}
