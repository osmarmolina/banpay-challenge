## Deployment dev

1. Generar un archivo .env basado en el .env.template que se encuentra en la raiz del proyecto
2. Generar y levantar la imagen con el siguiente comando:

```bash
  docker compose up --build
```

## Development prod
1 Generar un archivo .env basado en el archivo .env.template que se encuentra en la raiz del proyecto

2. Generar la imagen productiva con el comando:
```bash
docker compose -f docker-compose.prod.yml build 
```
3. Levantar imagen productiva con el siguiente comando:
```bash
docker compose -f docker-compose.prod.yml up