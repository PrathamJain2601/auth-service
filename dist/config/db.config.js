"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
        {
            emit: 'event',
            level: 'error',
        },
    ],
});
// Listen for query events
exports.prisma.$on('query', (e) => {
    console.log('Duration: ' + e.duration + 'ms');
});
// Listen for info events
exports.prisma.$on('info', (e) => {
    console.log('Info: ' + e.message);
});
// Listen for warning events
exports.prisma.$on('warn', (e) => {
    console.warn('Warning: ' + e.message);
});
// Listen for error events
exports.prisma.$on('error', (e) => {
    console.error('Error: ' + e.message);
});
