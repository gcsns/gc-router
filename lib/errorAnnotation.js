"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function parseErrors(target) {
    const functions = Object.getOwnPropertyNames(target.prototype).filter((x) => x !== 'constructor');
    for (const propertyName of functions) {
        const propertyValue = target.prototype[propertyName];
        const isMethod = propertyValue instanceof Function;
        if (!isMethod)
            continue;
        const descriptor = getMethodDescriptor(propertyName);
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield originalMethod.apply(this, args);
                    return result;
                }
                catch (e) {
                    e.errorIdentifier = '!parseGeneratedError!';
                    return e;
                }
            });
        };
        Object.defineProperty(target.prototype, propertyName, descriptor);
    }
    function getMethodDescriptor(propertyName) {
        if (target.prototype.hasOwnProperty(propertyName))
            return Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        // create a new property descriptor for the base class' method
        return {
            configurable: true,
            enumerable: true,
            writable: true,
            value: target.prototype[propertyName]
        };
    }
}
exports.parseErrors = parseErrors;
//# sourceMappingURL=errorAnnotation.js.map