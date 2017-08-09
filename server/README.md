# backend

- backend use node.js, express. and there is an rest api sample.

# some points for starter

## 1. error process

it's just my way. i handle **backend error** like this.

in anyway, we must return something to client. my rule is to return a json like `{error: error, data: data}`. i never catch or throw error, as this will make logic complicatedly. i do use callback to return json in any situation.

# serve

## 1. make sure mongodb works

``` bash
# confirm mongodb service
mongo
```

## 2.1. if linux

``` bash
cd vue-sample/server
# serve as production
NODE_ENV=production ./node_modules/.bin/babel-node app.js

# or serve as development
NODE_ENV=development ./node_modules/.bin/babel-node app.js
```

## 2.2. if windows

add NODE_ENV(development or production) to your system environment. and then add /yourpath/vue-sample/server/node_modules/.bin/ to PATH.

``` bash
cd vue-sample/server
babel-node app.js
```
