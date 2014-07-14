all: compile build


compile: 
	npm install
	bower install

build: build-style


build-style: 
	./node_modules/.bin/lessc ./style/less/index.less ./style/css/index.css