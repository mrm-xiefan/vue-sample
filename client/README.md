# frontend

- use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)
- jquery works not so satisfy on vue.js. but if you do understand vue.js, you can make both of them work.

# some points for starter

## 1. test rest api with out backend

change **development** in **src/store/controller.js** to use dummy rest api. `util.restGet('/api/someapi', {dummydata: 'somedata'}, false)` can get the dummydata in response and `util.restGet('/api/someapi', null, true)` can get an error response. don't forget to change **development** before build.(i'm sorry. i can't do this automatically.)

## 2. don't put third party package into static folder

just `npm install somepackage` and import them at **src/main.js**.

## 3. this SPA sample has two routings

point to http://localhost:8000/app2 to swich routing. defalut routing is http://localhost:8000/.

## 4. how to use store data in components

first, you must pass store to your component by props. this will let store accessable by your `<template></template>`. if you then want to access store in `<script></script>`. you should import it in `<script></script>`. there is an example in **src/components/app2Body.vue**.

## 5. as it is server side rendering, use axios instead of ajax

vue-resource is no longer useful.

rapping axios to restGet, restPost, restPut, restDelete in **src/common/util.js**.

## 6. error process

it's just my way. i handle **frontend error** like this.

don't catch error by try or throw error. simplely do ever error handling soon (ex: popup a modal window to show error info) and then reject. if something need to do after error happened (ex: clear something on browser), catch the rejected promise and do it.

see more in [./src/common/util.js] and [./src/components/app2Body.js]
