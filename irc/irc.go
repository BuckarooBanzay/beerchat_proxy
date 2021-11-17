package irc

import (
	"beerchat_proxy/types"
	"time"

	"github.com/sirupsen/logrus"
	irc "github.com/thoj/go-ircevent"
)

type IRCRemoteChat struct {
	bus        types.EventBus
	cfg        *types.RemoteConfig
	connection *irc.Connection
}

func (remote *IRCRemoteChat) Initialize(bus types.EventBus, cfg *types.RemoteConfig) error {
	remote.bus = bus
	remote.cfg = cfg

	remote.connection = irc.IRC(cfg.Username, cfg.Password)
	//remote.connection.UseTLS = true
	remote.connection.Password = cfg.Password
	err := remote.connection.Connect(cfg.Host)

	remote.connection.AddCallback("PRIVMSG", func(event *irc.Event) {
		logrus.Debugf("irc event, message: %s, sender: %s, channel: %s\n", event.Message(), event.Nick, event.Arguments[0])
		//TODO
	})

	go func() {
		for _, channel := range cfg.Channels {
			remote.connection.Join("#" + channel)
			time.Sleep(1 * time.Second)
		}
	}()

	return err
}

func (remote *IRCRemoteChat) ReceiveMessageSomehowHere(msg *types.Message) {
	// map channel to internal name
	for internalChannel, externalChannel := range remote.cfg.Channels {
		if msg.Channel == externalChannel {
			msg.Channel = internalChannel
			break
		}
	}

	remote.bus.OnMessageReceived(remote, msg)
}

func (remote *IRCRemoteChat) SendMessage(msg *types.Message) error {

	// map channel from internal to external name
	mappedChannel := remote.cfg.Channels[msg.Channel]
	msg.Channel = mappedChannel

	logrus.Debugf("irc, Would send %s on channel %s\n", msg.Text, msg.Channel)
	remote.connection.Privmsg(msg.Channel, msg.Text)
	return nil
}
