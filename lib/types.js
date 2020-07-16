"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = exports.RequestBase = exports.ResponseBase = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
class ResponseBase {
    constructor() {
        this.requestId = '---';
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ResponseBase.prototype, "requestId", void 0);
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