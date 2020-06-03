"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
class ResponseBase {
    constructor() {
        this.requestId = '---';
    }
}
exports.ResponseBase = ResponseBase;
class RequestBase {
    constructor() {
        this.requestId = 'NI';
    }
}
exports.RequestBase = RequestBase;
class ExpressError extends routing_controllers_1.HttpError {
    constructor(statusCode, message) {
        statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
        super(statusCode, message);
    }
}
exports.ExpressError = ExpressError;
//# sourceMappingURL=types.js.map