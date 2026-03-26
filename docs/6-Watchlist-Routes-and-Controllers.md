# Watchlist, Routes y Controllers

## Objetivo de esta parte

En esta fase del proyecto se ha preparado la parte inicial de `watchlist`.

La idea es permitir que un usuario pueda agregar peliculas a su lista personal usando una ruta propia y un controller separado.

## Que se ha creado

En esta parte se han creado:

- la ruta [`watchListRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/watchListRouters.js)
- el controller [`watchListController.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/watchListController.js)
- el middleware [`authMiddleware.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/middlewares/authMiddleware.js)
- la carpeta interna [`@watchList.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/@watchList.md)

Tambien se conecto la ruta en [`server.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/server.js):

```javascript
app.use("/watchlist", watchListRouters);
```

## Ruta actual

Ahora mismo la ruta disponible es:

```javascript
router.post("/", addToWatchListController);
```

Eso significa que el endpoint actual es:

```text
POST /watchlist
```

## Que hace el controller

El controller `addToWatchListController` hace esto:

- recibe `movieId`, `userId`, `status`, `rating` y `notes`
- valida que lleguen `movieId` y `userId`
- comprueba que la pelicula exista
- comprueba que el usuario exista
- revisa si esa pelicula ya estaba en la watchlist de ese usuario
- si no existe, crea un nuevo item en `watchlistItem`

## Validaciones importantes

### Si faltan IDs

Si no llegan `movieId` o `userId`, responde:

```text
400 Bad Request
```

### Si la pelicula no existe

Responde:

```text
400 Bad Request
```

### Si el usuario no existe

Responde:

```text
400 Bad Request
```

### Si ya estaba en la watchlist

Responde:

```text
409 Conflict
```

## Relacion con Prisma

La watchlist usa el modelo `watchlistItem` del esquema de Prisma.

Ese modelo relaciona:

- un usuario
- una pelicula

Y ademas guarda:

- `status`
- `rating`
- `notes`

La restriccion:

```prisma
@@unique([userId, movieId])
```

evita que un mismo usuario meta la misma pelicula dos veces.

## Ejemplo de body

```json
{
  "userId": "ce304397-4b03-4572-b45f-4c7220e61cbc",
  "movieId": "b2f94d0d-3d19-4a22-8f8d-61727e43f214",
  "status": "PLANNED",
  "rating": 8,
  "notes": "Quiero verla este fin de semana"
}
```

## Estructura actual relacionada

```text
src/
  controllers/
    watchList/
      @watchList.md
      watchListController.js
  routers/
    watchListRouters.js
server.js
```

## Idea importante de esta fase

Ahora mismo `watchlist` ya tiene:

- su propia ruta
- su propio controller
- validacion basica
- control de duplicados
- conexion con Prisma

## Lo que aun falta

Aunque la ruta ya funciona a nivel base, todavia hay una mejora clave pendiente:

- asegurar que el usuario que agrega la pelicula este realmente autenticado
- completar la logica real de `authMiddleware`

## Siguiente paso natural

El siguiente punto del proyecto es crear middleware de autenticacion para `watchlist`.

La razon es que ahora mismo se sigue recibiendo `userId` manualmente en el body.

Mas adelante lo correcto sera:

- hacer login
- recibir un JWT
- validar ese token con middleware
- obtener el usuario autenticado desde el token
- usar ese usuario en `watchlist` sin confiar en un `userId` mandado manualmente
