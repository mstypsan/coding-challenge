## Introduction

This is a coding challenge for Weld

## Projects

- **Data-streams**: Our API that can receive calls and issue commands to **worker**. This service also stores any information that our customer wants to fetch.
- **Worker:** Fetches the data from external API. Makes any transformations you see fit. And sends it back to **data-streams** for storage.

### Message protocol used

- The **worker** is communicating with the **data-streams** with RabbitMQ using the [Event-based](https://docs.nestjs.com/microservices/basics#event-based) patten. The reason behind this is that we can benefit from retrying during an unexpected error. We can also add a dead letter queue.
- The **data-streams** will use the tcp protocol to communicate with the **worker**. It will use the [Request-response](https://docs.nestjs.com/microservices/basics#request-response) pattern in NestJS and if there are any errors in the worker, it will appear in the API.

## Getting Started

run RabbitMQ using a docker container

```
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
```

### data-streams:

You can start data-streams with:

```
yarn start
```

### worker:

You can start worker with:

```
yarn start worker
```

## Future changes

For Production environment, we can make the following improvements

- Logging
- Authentication for the API, especially if it is released in a public network
- Set up a dead letter queue
