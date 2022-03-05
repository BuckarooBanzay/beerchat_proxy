package types

type RemoteType string

const (
	IRCType      RemoteType = "irc"
	DiscordType  RemoteType = "discord"
	MinetestType RemoteType = "minetest"
)

type MessageType string

const (
	NormalType MessageType = "message"
	MeType     MessageType = "me"
)

type Message struct {
	RemoteType  RemoteType  `json:"remote_type"`
	MessageType MessageType `json:"type"`
	Name        string      `json:"name"`
	Username    string      `json:"username"`
	Channel     string      `json:"channel"`
	Message     string      `json:"message"`
	Direct      bool        `json:"direct"`
}
