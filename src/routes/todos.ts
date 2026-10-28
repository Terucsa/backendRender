import { Router } from 'express';
import type { Request, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import { todoStore } from '../store/todoStore';
import type { UpdateTodoDTO } from '../types/todo';

const router = Router();
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;

type JsonObject = Record<string, unknown>;

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseTitle(value: unknown): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new ApiError(400, 'El título es obligatorio');
  }

  const title = value.trim();
  if (title.length > MAX_TITLE_LENGTH) {
    throw new ApiError(400, `El título no puede superar los ${MAX_TITLE_LENGTH} caracteres`);
  }

  return title;
}

function parseDescription(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;

  if (typeof value !== 'string') {
    throw new ApiError(400, 'La descripción debe ser texto');
  }

  const description = value.trim();
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    throw new ApiError(400, `La descripción no puede superar los ${MAX_DESCRIPTION_LENGTH} caracteres`);
  }

  return description.length > 0 ? description : undefined;
}

router.get('/', (_req, res) => {
  res.json(todoStore.list());
});

router.post('/', (req: Request, res: Response) => {
  const body: unknown = req.body;

  if (!isJsonObject(body)) {
    throw new ApiError(400, 'El cuerpo de la petición no es válido');
  }

  const todo = todoStore.create({
    title: parseTitle(body.title),
    description: parseDescription(body.description),
  });

  res.status(201).json(todo);
});

router.delete('/completed', (_req, res) => {
  const removed = todoStore.clearCompleted();
  res.json({ removed });
});

router.get('/:id', (req, res) => {
  const todo = todoStore.findById(req.params.id);

  if (!todo) {
    throw new ApiError(404, 'Tarea no encontrada');
  }

  res.json(todo);
});

function updateTodo(req: Request, res: Response): void {
  const body: unknown = req.body;

  if (!isJsonObject(body)) {
    throw new ApiError(400, 'El cuerpo de la petición no es válido');
  }

  const changes: UpdateTodoDTO = {};

  if ('title' in body) {
    changes.title = parseTitle(body.title);
  }

  if ('description' in body) {
    changes.description = parseDescription(body.description);
  }

  if ('completed' in body) {
    if (typeof body.completed !== 'boolean') {
      throw new ApiError(400, 'El campo "completed" debe ser booleano');
    }
    changes.completed = body.completed;
  }

  if (Object.keys(changes).length === 0) {
    throw new ApiError(400, 'No hay campos válidos para actualizar');
  }

  const todo = todoStore.update(req.params.id, changes);

  if (!todo) {
    throw new ApiError(404, 'Tarea no encontrada');
  }

  res.json(todo);
}

router.put('/:id', updateTodo);
router.patch('/:id', updateTodo);

router.delete('/:id', (req, res) => {
  const removed = todoStore.delete(req.params.id);

  if (!removed) {
    throw new ApiError(404, 'Tarea no encontrada');
  }

  res.status(204).send();
});

export default router;
