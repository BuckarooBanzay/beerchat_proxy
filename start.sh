#!/bin/sh

export IRC_HOST=chat.freenode.net
export IRC_CHANNEL=pandorabox-test
export IRC_USERNAME=pandorabot_test
export IRC_PASSWORD=xyz
export ENABLE_DEBUG=true

node src/index.js
