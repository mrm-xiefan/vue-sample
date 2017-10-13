# backend

- backend use node.js, express, mongodb. and there is an rest api sample and an upload function.

# some points for starter

## 1. error process

it's just my way. i handle **backend error** like this.

in anyway, we must return something to client. my rule is to return a json like `{error: error, data: data}`. i never catch or throw error, as this will make logic complicatedly. i do use callback to return json in any situation.

## 2. make sharp(to create image's thumbnail) work

you must make sure your server to be 64bit architecture. if not, sharp will never work.

## 3. the difference of development and production

when development, upload to local pc. when production, upload to s3.

you can change all other difference in config.

# start service

## 1. make sure mongodb works

``` bash
# confirm mongodb service
mongo
```

## 2.1. if linux

``` bash
cd vue-sample/server
NODE_ENV=development ./node_modules/.bin/babel-node app.js
# or
NODE_ENV=production ./node_modules/.bin/babel-node app.js
```

## 2.2. if windows

add `NODE_ENV`(value should be development or production) to your system environment. and then add /yourpath/vue-sample/server/node_modules/.bin/ to `PATH`.

``` bash
cd vue-sample/server
babel-node app.js
```
