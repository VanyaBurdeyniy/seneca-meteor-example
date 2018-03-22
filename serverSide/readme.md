# Seneca meteor example server

## How to run server

Make your **config/config.json** file
Run: 
``` bash
npm i
npm i -g pm2
pm2 start processes.json
```


## config/config.json example

``` javascript
{
    "server": {
        "port": 3000,
        "access": {
            "origin": "*",
            "methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
    },
    "log": {
        "path": "./logs/log.txt"
    }
}
```

## API Documentation

You can generate the docs by running

``` bash
npm run docs
```

### Licence
COPYRIGHT 2017, 2018 SPIRENT COMMUNICATIONS OF ROCKVILLE, INC. UNPUBLISHED - ALL RIGHTS RESERVED