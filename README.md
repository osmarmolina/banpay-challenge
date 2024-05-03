
# Deploy con docker

## dev
1. Renombrar el archivo ***.env.template*** por ***.env***, este archivo se encuentra en la raiz del proyecto
2. Generar y levantar la imagen con el siguiente comando:

```bash
  docker compose up --build
```

## prod
1. Renombrar el archivo ***.env.template*** por ***.env***, este archivo se encuentra en la raiz del proyecto
2. Generar la imagen productiva con el comando:
```bash
docker compose -f docker-compose.prod.yml build 
```
3. Levantar imagen productiva con el siguiente comando:
```bash
docker compose -f docker-compose.prod.yml up
```

# Deploy sin docker

## Instalar e inicializar nats
Para cada sistema operativo es una diferente instalación

`Linux (Distribuciones basadas en ubuntu):`
```bash
sudo apt update
sudo apt install snapd
sudo snap install nats
nats-server
```

`Mac Os:`
```bash
brew install nats-server
nats server run
```
or

```bash
brew install nats-server
nats-server
```
`Windows:`

```bash
go install github.com/nats-io/nats-server/v2@latest
```

## Crear las variables de entorno
Renombrar los archivos ***.env.template*** por ***.env***,que se encuentran en cada microservicio: ***auth-microservicio***, ***users-microservicio*** y ***client-gateway***

## Instalar node
`Linux:`
```bash
sudo apt install nodejs
```
`Mac Os y Wonsows`
Descargar el instalador de https://nodejs.org/en/download

## Instalar NestJS

```bash
npm i -g @nestjs/cli
```

## Levantar todos los microservicios

1. Dirigirnos ala carpeta de ***client-gateway*** y ejecuta rel comando:
```bash
npm i
npm run start:dev
```
2. Dirigirnos ala carpeta de ***user-microservice*** y ejecuta rel comando:
```bash
npm i
npm run start:dev
```

3. Dirigirnos ala carpeta de ***auth-microservice*** y ejecutar el comando:
```bash
npm i
npm run start:dev
```

# wiki 
https://github.com/osmarmolina/banpay-challenge/wiki

