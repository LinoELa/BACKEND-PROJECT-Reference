# Middleware

## Objetivo de esta parte

En esta fase del proyecto se prepara la autenticacion de rutas privadas usando middleware.

La idea es que antes de llegar al controller, la peticion pase por una capa intermedia que compruebe si el usuario esta autenticado.

## Que es un middleware

Un middleware es una funcion que se ejecuta entre la peticion del cliente y el controller final.

Sirve para hacer tareas como:

- validar tokens
- bloquear accesos no autorizados
- leer datos del usuario autenticado
- reutilizar logica comun en varias rutas

## Archivo actual

El middleware actual esta en [`authMiddleware.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/middlewares/authMiddleware.js).

## Que hace `authMiddleware`

Ahora mismo `authMiddleware` hace esto:

1. intenta leer el token JWT
2. primero revisa el header `Authorization`
3. si no lo encuentra ahi, intenta leerlo desde la cookie `jwt`
4. si no hay token, responde `401 Unauthorized`
5. si hay token, lo valida con `JWT_SECRET`
6. saca el `id` del usuario desde el payload
7. busca ese usuario en Prisma
8. si existe, lo guarda en `req.user`
9. si todo esta bien, ejecuta `next()`

## Por que esto es importante

Hasta ahora en `watchlist` estabamos recibiendo `userId` manualmente en el body.

Eso no es suficiente como proteccion real.

Con middleware, la idea correcta es:

- el usuario hace login
- recibe un JWT
- manda ese token en la peticion
- el middleware valida el token
- el backend identifica al usuario autenticado
- la ruta ya no depende de un `userId` escrito manualmente

## Relacion con watchlist

En [`watchListRouters.js`](/c:/Users/Pc-lino-ela/Documents/Ela/DEVELOPER/EXPRESS-CRASH/PedroTech/src/routers/watchListRouters.js) ya se esta usando:

```javascript
router.use(authMiddleware);
```

Eso significa que las rutas de `watchlist` pasan primero por el middleware antes de llegar al controller.

## Estructura actual relacionada

```text
src/
  middlewares/
    @middlewares.md
    authMiddleware.js
  routers/
    watchListRouters.js
  controllers/
    watchList/
      addWatchListController.js
      removeWatchListController.js
      updateWatchListController.js
```

## Lo que ya esta hecho

En esta fase ya tenemos:

- carpeta `middlewares`
- `authMiddleware.js`
- uso del middleware en `watchListRouters.js`
- estructura de `req.user`
- controllers de watchlist preparados para trabajar con `req.user.id`
- documentacion interna de middlewares

## Lo que aun falta mejorar

Aunque ya existe la base del middleware, todavia hay mejoras pendientes:

- dejar claro si el token vendra por header, cookie o ambos
- revisar si se va a usar `cookie-parser` si queremos leer cookies en Express
- dejar de depender de `userId` manual en el body de watchlist
- usar `req.user.id` dentro del controller de watchlist

## Siguiente paso natural

El siguiente punto es conectar el middleware con el controller de watchlist para que:

- el usuario autenticado salga de `req.user`
- el `userId` no tenga que venir desde el body
- la watchlist quede realmente protegida
