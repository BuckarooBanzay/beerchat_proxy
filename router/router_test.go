package router

import (
	"beerchat_proxy/types"
	"testing"
)

type TestRemote struct{}

func (remote *TestRemote) Initialize(ch chan<- *types.Message, cfg *types.RemoteConfig) error {
	return nil
}

func (remote *TestRemote) SendMessage(msg *types.Message) error {
	return nil
}

func testProvider(typename types.RemoteType) types.RemoteChat {
	switch typename {
	case "test":
		return &TestRemote{}
	}
	return nil
}

func TestRouter(t *testing.T) {

	remotes := []*types.RemoteConfig{
		{
			Name: "test1",
			Type: "test",
			Channels: map[string]string{
				"main": "xy",
			},
		},
	}

	router := NewRouter(remotes, testProvider)
	err := router.Start()
	if err != nil {
		panic(err)
	}
	router.Stop()
}
