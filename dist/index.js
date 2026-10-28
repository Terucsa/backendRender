"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const port = Number(process.env.PORT ?? 3001);
if (Number.isNaN(port)) {
    throw new Error('La variable PORT debe ser un número');
}
const server = app_1.default.listen(port, () => {
    console.log(`API de tareas escuchando en http://localhost:${port}`);
});
function shutdown() {
    console.log('\nCerrando servidor...');
    server.close(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
//# sourceMappingURL=index.js.map