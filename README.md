
# Deploy con docker

## Deployment dev
1. Generar un archivo .env basado en el .env.template que se encuentra en la raiz del proyecto
2. Generar y levantar la imagen con el siguiente comando:

```bash
  docker compose up --build
```

## Development prod
1. Generar un archivo .env basado en el .env.template que se encuentra en la raiz del proyecto
2. Generar la imagen productiva con el comando:
```bash
docker compose -f docker-compose.prod.yml build 
```
3. Levantar imagen productiva con el siguiente comando:
```bash
docker compose -f docker-compose.prod.yml up
```

# Inicializar sin docker

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
`Windows:`

Descargar el archivo correspondiente a Windows ***nats-x.x.x-windows-amd64.zip*** del repositorio https://github.com/nats-io/natscli/releases

## Crear las variables de entorno
Crear un archivo.env basado en el .env.template de cada microservicio (uasers-microservice, auth-microservice y client-gateway)

## Levantar todos los microservicios

1. Dirigirnos ala carpeta de ***client-gateway*** y ejecutarel comando:
```bash
npm run start:dev
```
2. Dirigirnos ala carpeta de ***user-microservice*** y ejecutarel comando:
```bash
npm run start:dev
```

3. Dirigirnos ala carpeta de ***auth-microservice*** y ejecutarel comando:
```bash
npm run start:dev
```

# wiki 
https://github.com/osmarmolina/banpay-challenge/wiki

