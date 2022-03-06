package router

import "beerchat_proxy/types"

type Router struct {
	config_map map[string]*types.RemoteConfig
	remote_map map[string]types.RemoteChat
	chan_map   map[string]chan<- *types.Message
	run        bool
}

type RemoteProvider func(typename types.RemoteType) types.RemoteChat

func NewRouter(remotes []*types.RemoteConfig, provider RemoteProvider) *Router {
	config_map := make(map[string]*types.RemoteConfig)
	remote_map := make(map[string]types.RemoteChat)
	chan_map := make(map[string]chan<- *types.Message)

	for _, remoteCfg := range remotes {
		remote := provider(remoteCfg.Type)
		remote_map[remoteCfg.Name] = remote
		ch := make(chan<- *types.Message)
		chan_map[remoteCfg.Name] = ch
	}

	return &Router{
		remote_map: remote_map,
		config_map: config_map,
		chan_map:   chan_map,
	}
}

func (router *Router) Start() error {
	for name, remote := range router.remote_map {
		cfg := router.config_map[name]
		ch := router.chan_map[name]
		err := remote.Initialize(ch, cfg)
		if err != nil {
			return err
		}
	}
	router.run = true
	go router.loop()
	return nil
}

func (router *Router) loop() {
	//TODO
}

func (router *Router) Stop() {
	router.run = false
}
