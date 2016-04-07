NPM?=$(shell which npm)
BOWER?=$(shell pwd)/node_modules/bower/bin/bower
SERVER?=$(shell pwd)/node_modules/http-server/bin/http-server
SERVER_PATH?=./original
install:
	$(NPM) install
	$(BOWER) install
server:
	$(SERVER) $(SERVER_PATH)
