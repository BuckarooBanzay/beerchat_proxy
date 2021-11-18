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
	logrus.Debugf("Creating discord connection for '%s'", cfg.Name)

	session, err := discordgo.New("Bot " + cfg.Token)
	if err != nil {
		return err
	}
	remote.session = session

	session.AddHandler(remote.messageCreate)

	err = session.Open()
	if err != nil {
		return err
	}

	return nil
}

func (remote *DiscordRemoteChat) messageCreate(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	logrus.Debugf("discord msg, content: %s, username: %s, channel: %s", m.Content, m.Author.Username, m.ChannelID)
	remote.bus.OnMessageReceived(remote, &types.Message{
		Type:    types.DiscordType,
		Name:    remote.cfg.Name,
		Message: m.Content,
	})
}

func (remote *DiscordRemoteChat) SendMessage(msg *types.Message) error {
	logrus.Debugf("discord, would send %s on channel %s\n", msg.Message, msg.Channel)
	return nil
}
