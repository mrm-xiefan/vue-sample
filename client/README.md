# frontend

- use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)
- jquery works not so satisfy on vue.js. but if you do understand vue.js, you can make both of them work.

# some points for starter

## 1. you can't use => in vue component methods

this happens because the ES6/2015 arrow function syntax `(() => {})` binds this to the parent context. to fix this, you'll need to use a normal function declaration:

``` javascript
mounted: function() {
  // do some thing
}
```

or, my personal preference is the ES6/2015 shorthand, which does the same as above:

``` javascript
mounted() {
  // do some thing
}
```

## 2. socket.io

send your event any where like this: `utils.socketEmit('someEvent', params)`.

listen server's message at [src/store/manager.js](./src/store/manager.js).

## 3. test rest api

change **cors** in [src/store/controller.js](./src/store/controller.js) to use cross region rest api. do't forget starting backend service(reference [../server/README.md](../server/README.md)).

also you can customize your dummy response without using real api. just write `utils.restGet('/api/someapi', params, dummyResponse)` to get the dummyResponse.

or write `utils.restGet('/api/someapi', params, null, 'network')` to get an error response.

## 4. don't put third party package into static folder

just `npm install somepackage` and then import it at [src/main.js](./src/main.js).

## 5. use axios instead of ajax

vue-resource is no longer useful.

rapping axios to restGet, restPost, restPut, restDelete in [src/tool/utils.js](./src/tool/utils.js).

## 6. error process

it's just my way. i handle **frontend error** like this.

don't catch error by try or throw error. simplely do ever error handling soon (ex: popup a modal window to show error info) and then reject. if something need to do after error happened (ex: clear something on browser), catch the rejected promise and do it.

see more in [src/tool/utils.js](./src/tool/utils.js) and [src/components/app2Body.vue](./src/components/app2Body.vue)
