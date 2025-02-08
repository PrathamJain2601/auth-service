"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseCodes = void 0;
const responseCodes = {
    success: {
        ok: (res, data, message = 'Success') => {
            res.status(200).json({
                status: 200,
                message: message,
                data: data
            });
        },
        created: (res, data, message = 'Resource created successfully') => {
            res.status(201).json({
                status: 201,
                message: message,
                data: data
            });
        }
    },
    clientError: {
        badRequest: (res, data = null, message = 'Bad Request') => {
            res.status(400).json({
                status: 400,
                message: message,
                data: data
            });
        },
        unauthorized: (res, message = 'Unauthorized') => {
            res.status(401).json({
                status: 401,
                message: message
            });
        },
        forbidden: (res, message = 'Forbidden') => {
            res.status(403).json({
                status: 403,
                message: message
            });
        },
        notFound: (res, message = 'Resource not found') => {
            res.status(404).json({
                status: 404,
                message: message
            });
        }
    },
    serverError: {
        internalServerError: (res, message = 'Internal Server Error') => {
            res.status(500).json({
                status: 500,
                message: message
            });
        },
        serviceUnavailable: (res, message = 'Service Unavailable') => {
            res.status(503).json({
                status: 503,
                message: message
            });
        }
    }
};
exports.responseCodes = responseCodes;
