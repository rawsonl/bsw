bsw
===

Big Sexy Words



Tests may be run using npm local dependency karma

./node_modules/karma/bin/karma start ./tests/config.js

or with global access

karma start ./tests/config.js



Initial project setup on terminal

All dependencies, trigger builds ( client, server, stylesheets)
make 

Server/Client dependencies
make compile 

Build styles + ?
make build

Build styles ( less -> css )
make build-style