# backend

- backend use node.js, express. and there is a rest api sample.

# some points for starter

## serve

`babel-node app.js` is surely useful in develop. i want to use **pm2** to serve product, but not sucess yet.

``` bash
# install pm2 in global
npm install -g pm2

# serve you production
cd vue-sample/server
pm2 start app.js

# to confirm the process, and get the process id
pm2 list

# then you can start or stop you service by process id
pm2 stop 0
pm2 start 0

# to confirm detail
pm2 show 0

# to delete the list in pm2
pm2 delete 0
```
