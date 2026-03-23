
# PostgreSQL |  Prisma | Dotenv

## Prisma

Prisma es un ORM (Object-Relational Mapping) para Node.js y TypeScript que facilita la interacción con bases de datos relacionales como PostgreSQL. Proporciona una forma sencilla de definir el esquema de la base de datos, generar consultas, gestionar migraciones y trabajar con los datos de manera eficiente.

### Ejemplo de uso de Prisma con PostgreSQL

1. Instalar Prisma y el cliente:

```bash
npm install @prisma/client
npm install prisma --save-dev
````

2. Inicializar Prisma en el proyecto:

```bash
npx prisma init
```

3. Configurar la conexión a la base de datos en el archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/mi_base_de_datos"
```

4. Definir el esquema en `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

5. Generar el cliente y ejecutar migraciones:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Nota para este proyecto

Si vas a manejar una watchlist, `@@unique([userId, movieId])` va dentro del modelo `watchlistItem`.

No es obligatorio para Prisma, pero si es muy recomendable para que un usuario no meta la misma peli dos veces en su watchlist.

Y si quieres guardar quien creo una pelicula, el campo correcto en `Movie` es `createdBy`, no `createBy`.

```prisma
model Movie {
  id        Int      @id @default(autoincrement())
  title     String
  createdBy String
  createdAt DateTime @default(now())
}

model watchlistItem {
  id      Int @id @default(autoincrement())
  movieId Int
  userId  Int

  movie Movie @relation(fields: [movieId], references: [id])
  user  User  @relation(fields: [userId], references: [id])

  @@unique([userId, movieId])
}
```

---

### Comandos útiles de Prisma

* `npx prisma migrate dev --name <nombre>` → Crea y aplica una migración en desarrollo
* `npx prisma migrate deploy` → Aplica migraciones en producción
* `npx prisma db push` → Sincroniza el esquema sin crear migraciones
* `npx prisma studio` → Abre la interfaz gráfica para gestionar datos
* `npx prisma generate` → Genera el cliente de Prisma
* `npx prisma db seed` → Ejecuta el seeding de la base de datos

---

### Otros ORMs

#### Sequelize

* Uno de los ORMs más antiguos en el ecosistema Node.js
* Compatible con MySQL, PostgreSQL y SQLite
* Basado en modelos clásicos (Active Record)

Ideal para proyectos legacy o tradicionales.

#### TypeORM

* Muy usado en proyectos Node.js con TypeScript
* Compatible con PostgreSQL, MySQL, SQLite y más
* Soporta Active Record y Data Mapper
* Muy común en proyectos con NestJS

Ideal si quieres una estructura más orientada a entidades y decorators.

#### Drizzle ORM

* ORM moderno y ligero
* Muy centrado en TypeScript
* Tipado fuerte y consultas bastante explícitas
* Buena opción si quieres más control y menos abstracción

Ideal si buscas simplicidad, tipado sólido y un enfoque más moderno.

---



## Dotenv

`dotenv` se usa para cargar variables de entorno desde el archivo `.env` dentro de tu aplicación Node.js.

Prisma lee el archivo `.env` automáticamente, así que no necesitas configurar `dotenv` dentro de `schema.prisma`.

Pero en tu aplicación sí puedes usarlo así:

```bash
npm install dotenv
```

Y luego en el archivo principal:

```javascript
import 'dotenv/config';
```

o:

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

---

## PostgreSQL

PostgreSQL es un sistema de gestión de bases de datos relacional, open source, robusto y extensible. Es muy usado en aplicaciones backend por su estabilidad, rendimiento y soporte para consultas complejas.

---

## Otros ORMs

### Sequelize

* Uno de los ORMs más antiguos en Node.js
* Compatible con MySQL, PostgreSQL y SQLite
* Basado en modelos clásicos

Ideal para proyectos legacy o enfoques más tradicionales.

```

Lo que tenías estaba bastante bien, pero `dotenv` no estaba realmente explicado. Aquí ya queda claro cuándo lo usa Prisma y cuándo lo usa tu app.
```

---

## PostgreSQL

PostgreSQL es un sistema de gestión de bases de datos relacional (RDBMS) open source, potente y altamente extensible. Es conocido por su robustez, cumplimiento de estándares SQL y soporte para consultas complejas.

```


```
