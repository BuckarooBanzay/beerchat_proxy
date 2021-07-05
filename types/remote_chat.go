package types

type RemoteChat interface {
	Initialize(bus EventBus, cfg *RemoteConfig) error
	SendMessage(msg *Message) error
}
