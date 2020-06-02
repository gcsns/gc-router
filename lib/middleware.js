"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = () => {
    return (error, req, res, next) => {
        const status = error.statusCode || res.statusCode || 500;
        const message = {
            requestId: req.requestId,
            message: error.message || 'Something went wrong'
        };
        res.status(status).send({
            status,
            message
        });
    };
};
exports.parseMiddleware = () => {
    return (body, req, res) => {
        if (typeof body === 'object' && body !== null)
            body.requestId = req.requestId;
        else if (typeof body === 'string')
            body = {
                message: body,
                requestId: req.requestId
            };
        return body;
    };
};
//# sourceMappingURL=middleware.js.map