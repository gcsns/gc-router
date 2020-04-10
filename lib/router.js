"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const gc_logger_1 = require("@adhityan/gc-logger");
const path_1 = __importDefault(require("path"));
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
const parent_module_1 = __importDefault(require("parent-module"));
class Router {
    static initialize(app, config, container) {
        if (config.enableDocumentation) {
            const documentationUrl = '/openapi'; //not allowed to customize it because we want to load an external swagger for this
            gc_logger_1.Logger.debug(`Loading OpenAPI Spec at path: ${documentationUrl}`);
            const parent = parent_module_1.default();
            app.get(`${documentationUrl}`, function (_req, res) {
                var _a, _b, _c, _d;
                gc_logger_1.Logger.info('Serving documentation on request');
                const storage = routing_controllers_1.getMetadataArgsStorage();
                if (parent && ((_a = config.documentationParameters) === null || _a === void 0 ? void 0 : _a.baseUrl)) {
                    const parentJson = (_b = read_pkg_up_1.default.sync({ cwd: path_1.default.dirname(parent) })) === null || _b === void 0 ? void 0 : _b.packageJson;
                    const version = parentJson === null || parentJson === void 0 ? void 0 : parentJson.version;
                    if (version) {
                        gc_logger_1.Logger.debug(`Auto detected root package version ${version}`);
                        const description = (_c = config.documentationParameters.description) !== null && _c !== void 0 ? _c : parentJson === null || parentJson === void 0 ? void 0 : parentJson.description;
                        const title = (_d = config.documentationParameters.title) !== null && _d !== void 0 ? _d : parentJson === null || parentJson === void 0 ? void 0 : parentJson.name;
                        config.documentationParameters = {
                            info: {
                                title,
                                version
                            },
                            servers: [
                                {
                                    url: `${config.documentationParameters.baseUrl}/v${version}`,
                                    description: description
                                }
                            ]
                        };
                    }
                }
                const spec = routing_controllers_openapi_1.routingControllersToSpec(storage, config, config.documentationParameters);
                res.json(spec);
            });
        }
        if (container)
            routing_controllers_1.useContainer(container);
        routing_controllers_1.useExpressServer(app, config);
        Router.routerConfig = config;
    }
    static getConfig() {
        return Router.routerConfig;
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map