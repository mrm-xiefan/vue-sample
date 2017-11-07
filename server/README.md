# backend

- backend use node.js, express, mongodb. and there is an rest api sample and an upload function.

# some points for starter

## 1. error process

it's just my way. i handle **backend error** like this.

in anyway, we must return something to client. my rule is to return a json like `{error: error, data: data}`. i never catch or throw error, as this will make logic complicatedly. i do use callback to return json in any situation.

## 2. make sharp(to create image's thumbnail) work

you must make sure your server to be 64bit architecture. if not, sharp will never work.
