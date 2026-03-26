# @watchList

Esta subcarpeta agrupa los controllers del modulo de watchlist.

Aqui se coloca la logica relacionada con:

- agregar peliculas a la watchlist
- eliminar peliculas de la watchlist
- validar que existan `userId` y `movieId`
- evitar duplicados en la watchlist
- guardar estado, rating y notas del item

En este proyecto actual, los controllers principales son:

- `addToWatchListController`
- `removeFromWatchListController`
- `updateWatchListController`

La idea es separar esta logica de `auth` para que cada modulo tenga su propia responsabilidad.
