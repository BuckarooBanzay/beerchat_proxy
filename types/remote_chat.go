package types

type RemoteChat interface {
	Initialize(bus EventBus) error
	SendMessage(channel, msg string) error
}
