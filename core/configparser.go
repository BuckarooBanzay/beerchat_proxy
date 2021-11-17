package core

import (
	"beerchat_proxy/types"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

func replaceEnvVars(s string) (string, error) {
	parts := strings.Split(s, ":")
	if len(parts) == 2 && parts[0] == "ENV" {
		v := os.Getenv(parts[1])
		if v == "" {
			return "", fmt.Errorf("env var not found: '%s'", parts[1])
		} else {
			return v, nil
		}
	} else {
		return s, nil
	}
}

func ParseConfig(r io.Reader) (*types.Config, error) {
	cfg := &types.Config{}
	err := json.NewDecoder(r).Decode(cfg)

	for _, remote := range cfg.Remotes {
		pw, err := replaceEnvVars(remote.Password)
		if err != nil {
			return nil, err
		}
		remote.Password = pw

		token, err := replaceEnvVars(remote.Token)
		if err != nil {
			return nil, err
		}
		remote.Token = token
	}
	return cfg, err
}
