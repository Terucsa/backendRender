import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Ruta no encontrada' });
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ error: 'El cuerpo de la petición no contiene JSON válido' });
    return;
  }

  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
}
