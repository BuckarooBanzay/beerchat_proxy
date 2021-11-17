package core

import (
	"bytes"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseEmptyConfig(t *testing.T) {
	r := bytes.NewReader([]byte(`{"remotes":[]}`))
	cfg, err := ParseConfig(r)
	assert.NoError(t, err)
	assert.NotNil(t, cfg)
	assert.NotNil(t, cfg.Remotes)
}

func TestParseEnvConfig(t *testing.T) {
	r := bytes.NewReader([]byte(`{
		"remotes":[{
			"password":"ENV:MYPASS"
		}]
	}`))
	os.Setenv("MYPASS", "mypass")
	cfg, err := ParseConfig(r)
	assert.NoError(t, err)
	assert.NotNil(t, cfg)
	assert.NotNil(t, cfg.Remotes)
	assert.Equal(t, 1, len(cfg.Remotes))
	assert.Equal(t, "mypass", cfg.Remotes[0].Password)
}

func TestParseInvalidEnvConfig(t *testing.T) {
	r := bytes.NewReader([]byte(`{
		"remotes":[{
			"password":"ENV:blah"
		}]
	}`))
	_, err := ParseConfig(r)
	assert.Error(t, err)
}
