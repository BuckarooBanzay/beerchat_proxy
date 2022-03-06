package minetest

import (
	"beerchat_proxy/types"
	"fmt"
	"net/http"
)

type MinetestRemoteChat struct {
	ch chan<- *types.Message
}

func (remote *MinetestRemoteChat) Initialize(ch chan<- *types.Message, cfg *types.RemoteConfig) error {
	//TODO: setup http endpoints
	remote.ch = ch
	path := "/"
	if cfg.Options["path"] != "" {
		path = cfg.Options["path"]
	}
	http.HandleFunc(path, remote.handleHttp)

	return nil
}

func (remote *MinetestRemoteChat) handleHttp(w http.ResponseWriter, req *http.Request) {
	fmt.Printf("minetest http '%s' endpoint '%s'\n", req.Method, req.URL.Path)
}

func (remote *MinetestRemoteChat) SendMessage(msg *types.Message) error {
	fmt.Printf("minetest, Would send %s on channel %s\n", msg.Message, msg.Channel)
	return nil
}
