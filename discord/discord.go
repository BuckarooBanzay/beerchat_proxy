package discord

import (
	"beerchat_proxy/types"

	"github.com/bwmarrin/discordgo"
	"github.com/sirupsen/logrus"
)

type DiscordRemoteChat struct {
	bus     types.EventBus
	cfg     *types.RemoteConfig
	session *discordgo.Session
}

func (remote *DiscordRemoteChat) Initialize(bus types.EventBus, cfg *types.RemoteConfig) error {
	remote.bus = bus
	remote.cfg = cfg

	session, err := discordgo.New("Bot " + cfg.Token)
	if err != nil {
		return err
	}
	remote.session = session

	session.AddHandler(remote.messageCreate)

	return nil
}

func (remote *DiscordRemoteChat) messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	logrus.Debugf("discord msg, content: %s, username: %s, channel: %s", m.Content, m.Author.Username, m.ChannelID)
}

func (remote *DiscordRemoteChat) SendMessage(msg *types.Message) error {
	logrus.Debugf("discord, would send %s on channel %s\n", msg.Text, msg.Channel)
	return nil
}
