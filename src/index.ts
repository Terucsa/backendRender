import 'dotenv/config';
import app from './app';

const port = Number(process.env.PORT ?? 3001);

if (Number.isNaN(port)) {
  throw new Error('La variable PORT debe ser un número');
}

const server = app.listen(port, () => {
  console.log(`API de tareas escuchando en http://localhost:${port}`);
});

function shutdown(): void {
  console.log('\nCerrando servidor...');
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
