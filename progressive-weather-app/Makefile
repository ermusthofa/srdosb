SERVICE_NAME=srdosb
VERSION?=undefined

SERVICE_PATH=/app

NODE_ENV?=development
VUE_APP_PUBLIC_PATH?=cdn.srdosb.io

RUN=docker run --rm -ti \
	-p 8080:80

build:
	docker build -f Dockerfile \
		--build-arg ARG_NODE_ENV=${NODE_ENV} \
		--build-arg ARG_VUE_APP_PUBLIC_PATH=${VUE_APP_PUBLIC_PATH} \
		-t $(SERVICE_NAME):latest	 \
		-t $(SERVICE_NAME):$(VERSION) .

run:
	$(RUN) $(SERVICE_NAME):$(VERSION) sh