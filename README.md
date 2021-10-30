# Nodejs Redis Pub/Sub ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

> Redis

> Nodejs

> Pub/sub

Descripción del proyecto: Flujo básico de modelo de publicación y suscripción de eventos, utilizando Redis como canal para enviar los mensajes según corresponda.
El proyecto consta de 2 servidores, uno que realizará publicaciones y el otro que estará suscrito para la escucha.

## Acerca de Redis

* https://redis.io/

## Prerrequisitos

1. Node js
    * https://nodejs.org/es/download/
2. Docker
    * https://docs.docker.com/get-docker/
3. Express
    * https://expressjs.com/es/
4. Redis
    * https://redis.io/

## Instalación

* Dirigirse a cada uno de los servidores y ejecutar

```
npm install
```

## Desarrollo

Ejecutar `npm run dev` en cada uno de los los servidores

```bash
$ npm run dev
```

## Docker compose

* Levantar los 2 servidores y redis

```
docker-compose up
docker-compose down
```

## Endpoints

| Servicio | Puerto | Descripción |
|:--------|:--------|:--------|
|`Redis` | 6379 |  Redis channel
|`Servicio pub` | 3001 | Servicio de publicación |
|`Servicio sub` | 3002 | Servicio de suscripción |

NOTA: Realizar petición GET a `Servicio pub` en /

## Equipo

Desarrollado por Diego Cortés

* dcortes.net@gmail.com
