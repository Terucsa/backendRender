import { v4 as uuidv4 } from 'uuid';
import type { CreateTodoDTO, Todo, UpdateTodoDTO } from '../types/todo';

class TodoStore {
  private readonly todos = new Map<string, Todo>();

  list(): Todo[] {
    return [...this.todos.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  findById(id: string): Todo | undefined {
    return this.todos.get(id);
  }

  create(dto: CreateTodoDTO): Todo {
    const now = new Date().toISOString();
    const todo: Todo = {
      id: uuidv4(),
      title: dto.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    if (dto.description) {
      todo.description = dto.description;
    }

    this.todos.set(todo.id, todo);
    return todo;
  }

  update(id: string, changes: UpdateTodoDTO): Todo | undefined {
    const current = this.todos.get(id);
    if (!current) return undefined;

    const updated: Todo = {
      ...current,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    this.todos.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.todos.delete(id);
  }

  clearCompleted(): number {
    let removed = 0;

    for (const [id, todo] of this.todos) {
      if (todo.completed) {
        this.todos.delete(id);
        removed += 1;
      }
    }

    return removed;
  }
}

export const todoStore = new TodoStore();
