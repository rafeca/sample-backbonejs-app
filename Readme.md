# Sample Backbone.js web app [![Build Status](https://travis-ci.org/rafeca/sample-backbonejs-app.png?branch=master)](https://travis-ci.org/rafeca/sample-backbonejs-app)

## Requirements

* Node.js
* Ruby

## How to install

Install Bower and Grunt npm modules globally:

```sh
$ sudo npm install -g grunt-cli bower
```

Install needed modules from npm, RubyGems and Bower:

```sh
$ npm install
$ bundle install
$ bower install
```

## How to run

Run a webserver which watches for file changes and autocompiles code:

```sh
$ grunt server
```

## How to test

Execute the JSHint checks:

```sh
$ grunt jshint
```

Execute all the tests from the command line via PhantomJS:

```sh
$ grunt test
```

Or just run a webserver to be able execute the tests from any browser:

```sh
$ grunt server:test
```

## How to deploy

Run a server with the deployable version of the app:

```sh
$ grunt server:dist
```

This will have all the minimized JS and CSS code into single files.

To create the distributable code, just run:

```sh
$ grunt
```

This will create all the HTML,CSS,JS and assets into the `dist/` folder.
