# a sample project with vue.js frontend and node.js backend.

frontend use jquery, adminlte(not vue-adminlte), vue-router(to make SPA). with out vuex.(i don't like flux.)

backend use node.js, express. and there is a rest api example.

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
npm install -g pm2
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
# then vue-sample/dist folder will be created.
```

## 3. develop backend

``` bash
cd vue-sample/server
NODE_ENV=development node app.js
```

## 4. deploy and serve your product

``` bash
cd vue-sample/client
npm run build
# then vue-sample/dist folder will be created.
cd vue-sample/server
pm2 start process.json --env production
```
