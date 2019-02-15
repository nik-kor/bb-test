# BB test

## Deps

* node@v10.10
* yarn

## To run everything


Just run 3 processes in different shells:

```sh
yarn # install deps

node src/gw
node src/srv1
node src/srv2
```

Good request with token
```
curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFyYXRoIn0.DQGNrcWLZ20nJ5FCMVZm17IU6Zq9LWieD8PAv4E-_1c' http://localhost:3000/hello
```

Bad request with token
```
curl -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFyYXRoIn0.TyicWXv0aCS62rscysz-5C7-s10DJZmGxGGG3jFHlHo' localhost:3000/hello
```

Requesting without a token
```
curl http://localhost:3000/hello
```

## TODO:

* use docker and docker-compose to run the environment. It will bring the consistency to dev setup and simplify running multiple processes
* use configs
* hide secret - inject the secret via env variable
