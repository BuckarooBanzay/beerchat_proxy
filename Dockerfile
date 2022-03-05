FROM golang:1.17.7 as go-app
COPY . /data
RUN cd /data && \
	go test ./... && \
	CGO_ENABLED=0 go build .

FROM alpine:3.15.0
COPY --from=go-app /data/beerchat_proxy /beerchat_proxy

CMD /beerchat_proxy