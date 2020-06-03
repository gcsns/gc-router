"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gc_logger_1 = require("@adhityan/gc-logger");
exports.handleError = (error, req, res) => {
    if (error.errorIdentifier)
        delete error.errorIdentifier;
    const status = error.statusCode || res.statusCode || 500;
    gc_logger_1.Logger.error('Express error', error);
    const message = {
        message: error.message || 'Something went wrong'
    };
    res.status(status);
    return message;
};
exports.parseMiddleware = (body, req, res) => {
    if (body.constructor === Array)
        body = { data: body, requestId: req.requestId };
    else if (typeof body === 'object' && body !== null) {
        if (body.errorIdentifier === '!parseGeneratedError!')
            body = exports.handleError(body, req, res);
        body.requestId = req.requestId;
    }
    else if (typeof body === 'string')
        body = {
            message: body,
            requestId: req.requestId
        };
    return body;
};
//# sourceMappingURL=middleware.js.map