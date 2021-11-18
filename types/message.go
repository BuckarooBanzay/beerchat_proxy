package types

type RemoteType string

const (
	IRCType      RemoteType = "irc"
	DiscordType  RemoteType = "discord"
	MinetestType RemoteType = "minetest"
)

type Message struct {
	Type     RemoteType `json:"type"`
	Name     string     `json:"name"`
	Username string     `json:"username"`
	Channel  string     `json:"channel"`
	Message  string     `json:"message"`
	Direct   bool       `json:"direct"`
}
