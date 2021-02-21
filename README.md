
# Exercises
Deployed URL : https://dev-neptunedays9.azurewebsites.net/api

## exercise1

```exercise1 request
curl --location --request POST 'http://<WX-Service-Base-URL>/api/Exercise/exercise1' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Cookie: ARRAffinity=24f17e1a8f4c4ff5f9208e853e1f84e70ef1b3779870d5eb7185f73ec52f3856' \
--data-raw '{
  "token": "<token>",
  "url": "https://dev-neptunedays9.azurewebsites.net/api"
}'
```

```exercise1 output
{
    "name": "<name>",
    "token": "<token>"
}
```

## exercise2

```exercise2 request
curl --location --request POST 'http://<WX-Service-Base-URL>/api/Exercise/exercise2' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Cookie: ARRAffinity=24f17e1a8f4c4ff5f9208e853e1f84e70ef1b3779870d5eb7185f73ec52f3856' \
--data-raw '{
  "token": "<token>",
  "url": "https://dev-neptunedays9.azurewebsites.net/api"
}'
```

```exercise2 output - sortOption=Low
[
    {
        "name": "Test Product D",
        "price": 5,
        "quantity": 0
    },
    {
        "name": "Test Product C",
        "price": 10.99,
        "quantity": 0
    },
    {
        "name": "Test Product A",
        "price": 99.99,
        "quantity": 0
    },
    {
        "name": "Test Product B",
        "price": 101.99,
        "quantity": 0
    },
    {
        "name": "Test Product F",
        "price": 999999999999,
        "quantity": 0
    }
]
```

## exercise3

```exercise3 request
curl --location --request POST 'http://<WX-Service-Base-URL>/api/Exercise/exercise3' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Cookie: ARRAffinity=24f17e1a8f4c4ff5f9208e853e1f84e70ef1b3779870d5eb7185f73ec52f3856' \
--data-raw '{
  "token": "<token>",
  "url": "https://dev-neptunedays9.azurewebsites.net/api"
}'
```

```exercise3 output
[
    {
        "passed": true,
        "url": "https://dev-neptunedays9.azurewebsites.net/api/trolleyTotal",
        "message": "Trolley total (14.4008121944889) returned correctly."
    },
    {
        "passed": true,
        "url": "https://dev-neptunedays9.azurewebsites.net/api/trolleyTotal",
        "message": "Trolley total (14) returned correctly."
    }
]
```
Note: precision issue (eg: 14/15th decimal) for some instances of the test case in exercise 3


## Description

Project is based on [NestJs](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```
Add a .env file in the root of the project with the config
```
USER_NAME=<base 64 encoded user name>
USER_TOKEN=<base 64 encoded token>
BASE_URL="<WX-Service-Base-URL>"
PRODUCTS_API_PATH="api/resource/products"
SHOPPER_HISTORY_API_PATH="api/resource/shopperHistory"
TROLLEY_CALCULATOR_API_PATH="api/resource/trolleyCalculator"
```
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
