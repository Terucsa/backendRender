"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoStore = void 0;
const uuid_1 = require("uuid");
class TodoStore {
    todos = new Map();
    list() {
        return [...this.todos.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    findById(id) {
        return this.todos.get(id);
    }
    create(dto) {
        const now = new Date().toISOString();
        const todo = {
            id: (0, uuid_1.v4)(),
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
    update(id, changes) {
        const current = this.todos.get(id);
        if (!current)
            return undefined;
        const updated = {
            ...current,
            ...changes,
            updatedAt: new Date().toISOString(),
        };
        this.todos.set(id, updated);
        return updated;
    }
    delete(id) {
        return this.todos.delete(id);
    }
    clearCompleted() {
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
exports.todoStore = new TodoStore();
//# sourceMappingURL=todoStore.js.map