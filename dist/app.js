"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const errorHandlers_1 = require("./middleware/errorHandlers");
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
const rawOrigins = process.env.CLIENT_ORIGIN?.trim();
const corsOrigin = !rawOrigins || rawOrigins === '*'
    ? true
    : rawOrigins
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
app.use((0, cors_1.default)({ origin: corsOrigin }));
app.use(express_1.default.json({ limit: '100kb' }));
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});
app.use('/api/todos', todos_1.default);
app.use(errorHandlers_1.notFoundHandler);
app.use(errorHandlers_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map