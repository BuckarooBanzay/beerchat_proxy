package discord

import (
	"beerchat_proxy/types"
	"fmt"

	"github.com/bwmarrin/discordgo"
)

type DiscordRemoteChat struct {
	bus     types.EventBus
	cfg     *types.RemoteConfig
	session *discordgo.Session
}

func (remote *DiscordRemoteChat) Initialize(bus types.EventBus, cfg *types.RemoteConfig) error {
	remote.bus = bus
	remote.cfg = cfg
	fmt.Printf("Creating discord connection for '%s'\n", cfg.Name)

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

	fmt.Printf("discord msg, content: %s, username: %s, channel: %s\n", m.Content, m.Author.Username, m.ChannelID)
	remote.bus.OnMessageReceived(remote, &types.Message{
		Type:    types.DiscordType,
		Name:    remote.cfg.Name,
		Message: m.Content,
	})
}

func (remote *DiscordRemoteChat) SendMessage(msg *types.Message) error {
	fmt.Printf("discord, would send %s on channel %s\n", msg.Message, msg.Channel)
	return nil
}
