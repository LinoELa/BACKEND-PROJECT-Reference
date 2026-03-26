# Watchlist, Routes y Controllers

## Objetivo de esta parte

En esta fase del proyecto se ha preparado la parte inicial de `watchlist`.

La idea es permitir que un usuario pueda agregar peliculas a su lista personal usando una ruta propia y un controller separado.

## Que se ha creado

En esta parte se han creado:

- la ruta [`watchListRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/watchListRouters.js)
- el controller [`addWatchListController.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/addWatchListController.js)
- el controller [`removeWatchListController.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/removeWatchListController.js)
- el controller [`updateWatchListController.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/updateWatchListController.js)
- el middleware [`authMiddleware.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/middlewares/authMiddleware.js)
- la carpeta interna [`@watchList.md`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/controllers/watchList/@watchList.md)

Tambien se conecto la ruta en [`server.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/server.js):

```javascript
app.use("/watchlist", watchListRouters);
```

## Ruta actual

Ahora mismo las rutas disponibles son:

```javascript
router.post("/", addToWatchListController);
router.delete("/:id", removeFromWatchListController);
router.put("/:id", updateWatchListController);
```

Eso significa que los endpoints actuales son:

```text
POST /watchlist
DELETE /watchlist/:id
PUT /watchlist/:id
```

## Que hace cada controller

### `addToWatchListController`

- recibe `movieId`, `status`, `rating` y `notes`
- usa `req.user.id` desde el middleware
- valida que llegue `movieId`
- comprueba que la pelicula exista
- revisa si esa pelicula ya estaba en la watchlist de ese usuario
- si no existe, crea un nuevo item en `watchlistItem`

### `removeFromWatchListController`

- busca el item por `req.params.id`
- comprueba que exista
- comprueba que pertenezca al usuario autenticado
- lo elimina si todo es correcto

### `updateWatchListController`

- busca el item por `req.params.id`
- comprueba que exista
- comprueba que pertenezca al usuario autenticado
- actualiza `status`, `rating` y `notes`
- solo modifica los campos que lleguen en el body

## Validaciones importantes

### Si falta `movieId` al agregar

Responde:

```text
400 Bad Request
```

### Si la pelicula no existe

Responde:

```text
400 Bad Request
```

### Si no existe el item al borrar o actualizar

Responde:

```text
404 Not Found
```

### Si el item no pertenece al usuario autenticado

Responde:

```text
403 Forbidden
```

### Si ya estaba en la watchlist al agregar

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
      addWatchListController.js
      removeWatchListController.js
      updateWatchListController.js
  routers/
    watchListRouters.js
  middlewares/
    authMiddleware.js
server.js
```

## Idea importante de esta fase

Ahora mismo `watchlist` ya tiene:

- su propia ruta
- controllers separados para add, remove y update
- validacion basica
- control de duplicados
- conexion con Prisma
- middleware de autenticacion conectado

## Lo que aun falta

Aunque la ruta ya funciona a nivel base, todavia hay una mejora clave pendiente:

- afinar completamente la integracion middleware + auth segun el flujo final
- decidir si el token vendra por header, cookie o ambos

## Siguiente paso natural

El siguiente punto del proyecto es crear middleware de autenticacion para `watchlist`.

La razon es que ahora mismo se sigue recibiendo `userId` manualmente en el body.

Mas adelante lo correcto sera:

- hacer login
- recibir un JWT
- validar ese token con middleware
- obtener el usuario autenticado desde el token
- usar ese usuario en `watchlist` sin confiar en un `userId` mandado manualmente
