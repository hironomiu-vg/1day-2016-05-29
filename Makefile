NPM?=$(shell which npm)
NODE?=$(shell which node)
BOWER?=$(shell pwd)/node_modules/bower/bin/bower
SERVER_PATH?=./OM-peta
install:
	$(NPM) install
	$(BOWER) install
server:
	$(NODE) $(SERVER_PATH)/server.js
