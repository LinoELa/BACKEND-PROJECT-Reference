# @watchList

Esta subcarpeta agrupa los controllers del modulo de watchlist.

Aqui se coloca la logica relacionada con:

- agregar peliculas a la watchlist
- validar que existan `userId` y `movieId`
- evitar duplicados en la watchlist
- guardar estado, rating y notas del item

En este proyecto actual, el controller principal es:

- `addToWatchListController`

La idea es separar esta logica de `auth` para que cada modulo tenga su propia responsabilidad.
