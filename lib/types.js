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
}
exports.RequestBase = RequestBase;
class ExpressError extends routing_controllers_1.HttpError {
    constructor(statusCode, message) {
        statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
        super(statusCode, message);
    }
    toJSON() {
        return this;
    }
}
exports.ExpressError = ExpressError;
//# sourceMappingURL=types.js.map