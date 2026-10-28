"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
const ApiError_1 = require("../errors/ApiError");
function notFoundHandler(_req, res) {
    res.status(404).json({ error: 'Ruta no encontrada' });
}
function errorHandler(error, _req, res, next) {
    if (res.headersSent) {
        next(error);
        return;
    }
    if (error instanceof ApiError_1.ApiError) {
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
//# sourceMappingURL=errorHandlers.js.map