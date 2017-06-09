# a sample of vue.js project.

frontend use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)

jquery works not so satisfy on vue.js. but if you do understand vue.js, you can make both of them perfect.

backend use node.js, express. and there is a rest api sample.

# installation

``` bash
# clone source from github
git clone https://github.com/mrm-xiefan/vue-sample

# install frontend dependencies
cd vue-sample/client
npm install

# install backend dependencies
cd vue-sample/server
npm install
```

# start project

## 1. develop frontend without backend

``` bash
cd vue-sample/client
npm run dev
```

## 2. build static files for backend

``` bash
cd vue-sample/client
npm run build
```

## 3. develop backend

``` bash
cd vue-sample/server
node app.js
```
