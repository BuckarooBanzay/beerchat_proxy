package types

type EventBus interface {
	OnMessageReceived(remote RemoteChat, msg *Message)
}
