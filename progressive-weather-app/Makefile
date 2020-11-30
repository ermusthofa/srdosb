SERVICE_NAME=srdosb
VERSION?=undefined

SERVICE_PATH=/app

NODE_ENV?=development
VUE_APP_CDN_URL?=https://cdn.srdosb.io

RUN=docker run --rm \
	-v $(PWD)/artifacts:/artifacts \
	-p 8088:80

build:
	docker build -f Dockerfile \
		--build-arg ARG_NODE_ENV=${NODE_ENV} \
		--build-arg ARG_VUE_APP_CDN_URL=${VUE_APP_CDN_URL} \
		-t $(SERVICE_NAME):latest	 \
		-t $(SERVICE_NAME):$(VERSION) .

run:
	rm -rf artifacts
	mkdir -p artifacts/js
	$(RUN) $(SERVICE_NAME):$(VERSION) cp /usr/share/nginx/html/js/minifiedscript.js /artifacts/js