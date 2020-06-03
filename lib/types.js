"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBase {
    constructor() {
        this.requestId = 'NI';
    }
}
exports.ResponseBase = ResponseBase;
class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
    }
}
exports.ExpressError = ExpressError;
//# sourceMappingURL=types.js.map