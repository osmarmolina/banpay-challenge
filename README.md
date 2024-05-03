
# Deploy con docker

## dev
1. Generar un archivo .env basado en el .env.template que se encuentra en la raiz del proyecto
2. Generar y levantar la imagen con el siguiente comando:

```bash
  docker compose up --build
```

## prod
1. Generar un archivo .env basado en el .env.template que se encuentra en la raiz del proyecto
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
Crear un archivo.env basado en el .env.template de cada microservicio (uasers-microservice, auth-microservice y client-gateway)

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

1. Dirigirnos ala carpeta de ***client-gateway*** y ejecutarel comando:
```bash
npm i
npm run start:dev
```
2. Dirigirnos ala carpeta de ***user-microservice*** y ejecutarel comando:
```bash
npm i
npm run start:dev
```

3. Dirigirnos ala carpeta de ***auth-microservice*** y ejecutarel comando:
```bash
npm i
npm run start:dev
```

# wiki 
https://github.com/osmarmolina/banpay-challenge/wiki

