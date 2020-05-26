#!/bin/bash

# build
docker build . -t beerchat_proxy

# setup
docker network create beerchat

# test config
#TODO echo ${BEERCHAT_CONFIG} >> beerchat.json

docker run --name beerchat_proxy --rm \
 -v $(pwd)/test/beerchat-test.json:/data/beerchat.json \
 --network beerchat \
 beerchat_proxy &

function cleanup {
	# cleanup
	docker stop beerchat_proxy
  docker network rm beerchat
}

trap cleanup EXIT

# wait for nodejs start
sleep 5

git clone https://github.com/minetest-beerchat/beerchat.git

CFG=/tmp/minetest.conf
MTDIR=/tmp/mt
WORLDDIR=${MTDIR}/worlds/world

cat <<EOF > ${CFG}
 beerchat.url = http://beerchat_proxy:8080
 secure.http_mods = beerchat
EOF

mkdir -p ${WORLDDIR}
chmod 777 ${MTDIR} -R
docker run --rm -i \
	-v ${CFG}:/etc/minetest/minetest.conf:ro \
	-v ${MTDIR}:/var/lib/minetest/.minetest \
  -v $(pwd)/beerchat:/var/lib/minetest/.minetest/worlds/world/worldmods/beerchat \
  -v $(pwd)/test/test_mod:/var/lib/minetest/.minetest/worlds/world/worldmods/beerchat_test \
  --network beerchat \
	registry.gitlab.com/minetest/minetest/server:5.2.0

test -f ${WORLDDIR}/integration_test.json && exit 0 || exit 1


echo "Test complete!"
