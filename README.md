# a sample project with vue.js frontend and node.js backend.

frontend use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)

backend use node.js, express, mongodb. with rest api example.

socket.io is enabled only when backend is served.

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

# install pm2 in global
# npm install -g pm2

# install mongodb and start mongo service
https://www.mongodb.com/download-center#community

# i recommmend to use this IDE
https://studio3t.com/
```

# start project

## 1. develop frontend without backend

``` bash
cd vue-sample/client
npm run dev
```

## 2. build static files for backend

change **cors** to **false** in [client/src/store/controller.js](./client/src/store/controller.js).

``` bash
cd vue-sample/client
npm run build
# then vue-sample/dist folder will be created.
```

## 3. develop backend

``` bash
cd vue-sample/server
# serve as production
./node_modules/.bin/babel-node app.js

# or serve as development
NODE_ENV=development ./node_modules/.bin/babel-node app.js
```
