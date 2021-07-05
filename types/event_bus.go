package types

type EventBus interface {
	OnMessageReceived(remote RemoteChat, channel, msg string)
}
