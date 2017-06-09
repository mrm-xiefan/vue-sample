# a sample of vue-cli project.

frontend use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)

jquery works not so satisfy on vue.js. but if you do understand vue.js, you can make both of them perfect.

backend use node.js, express. and there is a rest api sample.

use `npm run dev` to frontend develop with out backend. change *development* in *client/store/controller.js* to use dummy rest api. `util.restGet('/api/someapi', {dummydata: 'somedata'})` can get the dummydata in response.

use `npm run build` to pack all frontend resource to *static* folder. don't forget change *development* in *client/store/controller.js* to *false* **before build**. (i'm sorry. i can't do this automatically.)

then you may start your real server. the real service's port is setted in *app.js*. start service by `node app.js`. at last, point your browser to the end point.

## 1. Build Setup

``` bash
# clone source from github
git clone https://github.com/mrm-xiefan/vue-sample

cd vue-sample

# install dependencies
npm install
```

## 2. Develop

``` bash
# serve with hot reload at localhost:8080
npm run dev
```

## 3. Deploy

``` bash
# build for production with minification
npm run build

# start service
node app.js
```

## some points for starter

### don't put third party package into static folder

just `npm install somepackage` and import them at *client/main.js*.

### this SPA sample has two routings

point to *http://localhost:8000/app2* to swich routing. defalut routing is *http://localhost:8000/*.

### use store data in components

first, you must pass store to your component by props. this will let store accessable by your `<template></template>`. if you then want to access store in `<script></script>`. you should import it in `<script></script>`. there is an example in *client/components/app1Body.vue*.

### as it is server side rendering, use axios instead of ajax

vue-resource is no longer useful.

rapping axios to restGet, restPost, restPut, restDelete in *client/common/util.js*.

### don't catch error by try or throw error

it's just my way. simplely do ever error handling soon (ex: popup a modal window to show error info) and then reject. if something need to do after error happened (ex: clear something on browser), catch the rejected promise and do it.

see more in *client/common/util.js* and *client/components/app1Body.js*
