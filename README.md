# PedroTech-express

Backend con `Express`, `Prisma`, `PostgreSQL` y `JWT`.

Este proyecto trabaja autenticacion de usuarios, peliculas y watchlist. Ahora mismo ya incluye:

- registro de usuarios
- login y logout
- generacion de JWT
- Prisma con PostgreSQL
- IDs tipo UUID
- seed de usuarios
- seed de peliculas
- ruta base de watchlist

## Stack

- `Node.js`
- `Express`
- `Prisma`
- `PostgreSQL`
- `@prisma/adapter-pg`
- `bcryptjs`
- `jsonwebtoken`
- `dotenv`

## Estructura base

```text
src/
  config/
  controllers/
    auth/
    watchList/
  middlewares/
  routers/
  utils/
    token/
prisma/
  migrations/
  seed/
docs/
```

## Variables de entorno

Primero copia `.env.example` a `.env`.

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Variables esperadas:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
JWT_SECRET="replace_with_a_secure_random_secret"
JWT_EXPIRES_IN="7d"
```

## Instalacion

```bash
npm install
```

## Comandos importantes

### Desarrollo

```bash
npm run dev
```

Levanta el servidor con `nodemon`.

### Produccion

```bash
npm start
```

### Generar Prisma Client

```bash
npx prisma generate
```

### Crear una migracion nueva

```bash
npx prisma migrate dev --name nombre_del_cambio
```

### Resetear la base de datos en desarrollo

```bash
npx prisma migrate reset
```

### Abrir Prisma Studio

```bash
npx prisma studio
```

### Seed de usuarios

```bash
npm run seed:users
```

### Seed de peliculas

```bash
npm run seed:movies
```

## Como arrancar el proyecto desde cero

1. instala dependencias
2. copia `.env.example` a `.env`
3. rellena `DATABASE_URL` y `JWT_SECRET`
4. genera Prisma Client
5. aplica migraciones
6. levanta el servidor

Comandos:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Rutas actuales

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`

### Movies

- `GET /movies`
- `POST /movies`
- `PUT /movies`
- `DELETE /movies`

### Watchlist

- `POST /watchlist`

## Autenticacion

El login genera un JWT con `generateToken(user.id, res)`.

En este proyecto:

- el `id` del usuario es `UUID`
- la password se guarda con `bcrypt`
- el token se firma con `JWT_SECRET`

## Base de datos

Modelos principales:

- `User`
- `Movie`
- `watchlistItem`

Relaciones importantes:

- `Movie.createdBy` guarda el UUID del usuario creador
- `watchlistItem` relaciona usuario y pelicula
- `@@unique([userId, movieId])` evita duplicados en watchlist

## Seeds

### `userSeed.js`

Crea usuarios base:

- `Root`
- `Admin`
- `Lucia`
- `Mateo`
- `Sofia`

### `movieSeeds.js`

Crea peliculas de ejemplo usando un `userId` manual que debe existir previamente en la tabla `User`.

Flujo recomendado:

1. ejecutar `npm run seed:users`
2. copiar un UUID real de usuario
3. pegar ese UUID en `movieSeeds.js`
4. ejecutar `npm run seed:movies`

## Estado actual del proyecto

Ahora mismo ya esta montado:

- servidor Express
- conexion a PostgreSQL
- Prisma con migraciones
- auth con JWT
- IDs UUID
- seeds separados por usuarios y peliculas
- watchlist base

## Siguiente paso

El siguiente punto natural es crear middleware de autenticacion para proteger `watchlist`.

La idea es asegurar que el usuario que agrega una pelicula a la watchlist este realmente logueado y no mande solo un `userId` manual.

## Documentacion interna

Tienes documentacion adicional en:

- `docs/3-PostgreSQL-Prisma.md`
- `docs/4-JWT-Authentication-Controller.md`
- `docs/5-seed-file.md`
- `docs/6-Watchlist-Routes-and-Controllers.md`
- `docs/7-Middleware.md`
- `docs/github.md`
- `docs/prepararTodo.md`
