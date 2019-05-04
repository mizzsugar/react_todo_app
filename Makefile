UID := 1000
GID := 1000
NODE := 10
MOUNT_SOURCE := $$(pwd)

INTERNAL_API_URI := http://$$(ip route | grep docker | grep -o -e "[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[1-9][0-9]\{0,2\}"):6543
EXTERNAL_API_URI := http://$$(ip route | grep "eth0 proto kernel scope" | grep -o -e "[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[1-9][0-9]\{0,2\}"):6543


clean:
	-rm -rf node_modules/ .nuxt/

debug:
	docker run -u $(UID):$(GID) --rm -it -v $(MOUNT_SOURCE):/srv -p 3000:3000 -e INTERNAL_API_URI=$(INTERNAL_API_URI) -e EXTERNAL_API_URI=$(EXTERNAL_API_URI) node:$(NODE) /bin/bash

dev:
	@docker run -u $(UID):$(GID) --rm -it -v $(MOUNT_SOURCE):/srv -p 3000:3000 -e INTERNAL_API_URI=$(INTERNAL_API_URI) -e EXTERNAL_API_URI=$(EXTERNAL_API_URI) node:$(NODE)-alpine /bin/sh -c "cd /srv && npm run dev"

install:
	@docker run -u $(UID):$(GID) --rm -t -v $(MOUNT_SOURCE):/srv node:$(NODE) /bin/sh -c "cd /srv && npm install"

lint:
	@docker run -u $(UID):$(GID) --rm -t -v $(MOUNT_SOURCE):/srv node:$(NODE)-alpine /bin/sh -c "cd /srv && npm run lint"

test:
	@docker run -u $(UID):$(GID) --rm -t -v $(MOUNT_SOURCE):/srv -e INTERNAL_API_URI=$(INTERNAL_API_URI) -e EXTERNAL_API_URI=$(EXTERNAL_API_URI) node:$(NODE)-alpine /bin/sh -c "cd /srv && npm run test"

