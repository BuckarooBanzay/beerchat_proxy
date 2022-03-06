package types

type RemoteChat interface {
	Initialize(ch chan<- *Message, cfg *RemoteConfig) error
	SendMessage(msg *Message) error
}
