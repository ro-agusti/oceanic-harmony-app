# Oceanic Harmony

Oceanic Harmony es una aplicación diseñada para ofrecer desafíos de bienestar y mejorar la autoconfianza a través de herramientas intuitivas y dinámicas. La aplicación incluye funcionalidades como la gestión de usuarios, compra de desafíos (journals), y visualización de desafíos adquiridos.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [MySQL](https://www.mysql.com/)

Además, asegúrate de tener un archivo `.env` configurado con las siguientes variables:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=oceanic_harmony
DB_PORT=3306
JWT_SECRET=tu_secreto_para_jwt
```

---

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/ro-agusti/oceanic-harmony-app
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura tu base de datos:

Asegúrate de que tu servidor MySQL esté funcionando y ejecuta el siguiente comando para sincronizar los modelos:

```bash
npm run sync-db
```

---

## Scripts disponibles

### Iniciar el servidor

```bash
npm start
```

Este comando inicia el servidor en modo producción.

### Sincronizar modelos con la base de datos

```bash
npm run sync-db
```

Este script sincroniza los modelos con la base de datos, creando o actualizando tablas según los modelos definidos.

### Crear un desafío base

```bash
npm run create-challenge
```

Este script crea un desafío base en la tabla `challenges` con datos predeterminados.

---

## Endpoints principales

### Usuarios

- **Registrar usuario**: `POST /api/signup`
  - Datos requeridos: `name`, `email`, `password`
- **Login**: `POST /api/login`
  - Datos requeridos: `email`, `password`
- **Perfil**: `GET /api/profile`
  - Requiere autenticación mediante token (JWT).

### Challenges

- **Obtener todos los desafíos**: `GET /api/challenges`
- **Crear un desafío**: `POST /api/challenges`
  - Datos requeridos: `title`, `description`, `price`, `days`
- **Ver desafíos adquiridos**: `GET /api/purchased`
  - Requiere autenticación mediante token (JWT).

---

## Crear un desafío desde scripts

Puedes crear desafíos base desde el script `scripts/createChallenge.js`. Asegúrate de tener configurada la base de datos y ejecuta:

```bash
npm run create-challenge
```

Este script creará un desafío con los siguientes datos:

```javascript
{
    title: 'Reto de 21 días de Gratitud',
    description: 'Un desafío para cultivar la gratitud durante 21 días consecutivos.',
    price: 15.99,
    days: 21
}
```

---

## Tecnologías utilizadas

- **Backend**: Node.js, Express
- **Base de datos**: MySQL
- **Autenticación**: JSON Web Tokens (JWT)
- **ORM**: Sequelize

---

## Futuras funcionalidades

- Implementar pago integrado para la compra de desafíos.
- Sistema de notificaciones y recordatorios.
- Interfaz gráfica para la administración de desafíos.
