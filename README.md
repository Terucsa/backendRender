# Backend - API de tareas

API REST de tareas construida con Node.js, Express y TypeScript. Almacenamiento en memoria.

Este repositorio contiene únicamente el backend desplegado en Render.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Información del servicio y rutas disponibles |
| `GET` | `/health` | Estado del servicio (alias de `/api/health`) |
| `GET` | `/api/health` | Estado del servicio (usar como Health Check Path) |
| `GET` | `/api/todos` | Lista todas las tareas |
| `GET` | `/api/todos/:id` | Obtiene una tarea |
| `POST` | `/api/todos` | Crea una tarea (`title` obligatorio, `description` opcional) |
| `PUT` / `PATCH` | `/api/todos/:id` | Actualiza `title`, `description` y/o `completed` |
| `DELETE` | `/api/todos/:id` | Elimina una tarea |
| `DELETE` | `/api/todos/completed` | Elimina las tareas completadas |

Los errores se devuelven con la forma `{ "error": "mensaje" }`.

## Desarrollo local

```bash
npm install
cp .env.example .env   # opcional
npm run dev
```

La API escucha por defecto en http://localhost:3001.

```bash
npm run build     # compila a dist/
npm start         # ejecuta dist/index.js
npm run typecheck # comprueba tipos
```

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `PORT` | Puerto de escucha. Render lo define automáticamente. |
| `CLIENT_ORIGIN` | Origen(es) permitidos por CORS. Acepta `*` o una lista separada por comas. |

Ejemplo:

```env
CLIENT_ORIGIN=https://mi-frontend.vercel.app
```

## Despliegue en Render

Configuración del servicio web:

| Ajuste | Valor |
| --- | --- |
| Root Directory | `.` (la raíz de este repositorio) |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

Variables recomendadas:

- `CLIENT_ORIGIN`: dominio del frontend en Vercel (o `*` solo para pruebas).
- `NODE_VERSION`: opcional; Render usa una versión LTS compatible por defecto.

Si el Health Check Path está configurado como `/`, Render puede marcar el servicio como no saludable aunque la API funcione, porque la raíz devuelve información pero no es un chequeo de estado dedicado. Usa `/api/health`.

## Verificación

```bash
curl https://TU-SERVICIO.onrender.com/
curl https://TU-SERVICIO.onrender.com/api/health
curl https://TU-SERVICIO.onrender.com/api/todos
```

En el plan gratuito de Render el servicio se suspende por inactividad; la primera petición puede tardar en responder.

## Notas

- Las tareas se guardan en memoria: se pierden al reiniciar o redesplegar el servicio y no se comparten entre instancias.
- Para persistencia real, sustituye `src/store/todoStore.ts` por SQLite (`better-sqlite3`) o una base de datos gestionada.
