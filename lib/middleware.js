"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatInterceptor = exports.ErrorFormatHandler = void 0;
const gc_logger_1 = require("@adhityan/gc-logger");
const routing_controllers_1 = require("routing-controllers");
let ErrorFormatHandler = class ErrorFormatHandler {
    error(error, request, response, next) {
        if (error.errorIdentifier)
            delete error.errorIdentifier;
        const status = error.httpCode || request.statusCode || 500;
        gc_logger_1.Logger.error('[Express Error]', error);
        const message = {
            requestId: request.requestId,
            message: error.message || 'Something is not right...',
            errors: error.errors
        };
        response.status(status).send(message);
        next();
    }
};
ErrorFormatHandler = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], ErrorFormatHandler);
exports.ErrorFormatHandler = ErrorFormatHandler;
let FormatInterceptor = class FormatInterceptor {
    intercept(action, body) {
        if (body.constructor === Array)
            body = { data: body, requestId: action.request.requestId };
        else if (typeof body === 'object' && body !== null)
            body.requestId = action.request.requestId;
        else if (typeof body === 'string')
            body = {
                message: body,
                requestId: action.request.requestId
            };
        return body;
    }
};
FormatInterceptor = __decorate([
    routing_controllers_1.Interceptor()
], FormatInterceptor);
exports.FormatInterceptor = FormatInterceptor;
//# sourceMappingURL=middleware.js.map