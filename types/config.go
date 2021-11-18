package types

type Config struct {
	Remotes []*RemoteConfig `json:"remotes"`
}

type RemoteConfig struct {
	Name          string            `json:"name"`
	Type          RemoteType        `json:"type"`
	Debug         bool              `json:"debug"`
	Host          string            `json:"host"`
	Username      string            `json:"username"`
	Password      string            `json:"password"`
	Token         string            `json:"token"`
	SystemChannel string            `json:"system_channel"`
	Channels      map[string]string `json:"channels"`
	Options       map[string]string `json:"options"`
}
