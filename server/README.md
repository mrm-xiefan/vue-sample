# backend

- backend use node.js, express. and there is an rest api sample.

# some points for starter

## 1. error process

it's just my way. i handle **backend error** like this.

in anyway, we must return something to client. my rule is to return a json like `{error: error, data: data}`. i never catch or throw error, as this will make logic complicatedly. i do use callback to return json in any situation.

# serve

``` bash
# serve your production
./node_modules/.bin/babel-node app.js
```
