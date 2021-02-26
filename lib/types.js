"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingError = exports.RequestBase = exports.ResponseBase = void 0;
class ResponseBase {
}
exports.ResponseBase = ResponseBase;
class RequestBase {
}
exports.RequestBase = RequestBase;
class ProcessingError extends Error {
    toJSON() {
        return this;
    }
}
exports.ProcessingError = ProcessingError;
//# sourceMappingURL=types.js.map