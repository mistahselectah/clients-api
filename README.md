## Clients API

### Требования к системе
- Node.js v20.11.1
- docker-compose v2.28.1


### Установка
```
git clone https://selectah@bitbucket.org/selectah/clients-api.git
cd clients-api
```

### Запуск
```
docker-compose up -d
RUN npm run migration:run
RUN npm run seed:run
```

Приложение доступно по адресу http://localhost:<API_PORT>

Документация по адресу http://localhost:<API_PORT>/doc

PgAdmin по адресу http://localhost:5050



