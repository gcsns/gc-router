"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const gc_logger_1 = require("@adhityan/gc-logger");
class Router {
    static initialize(app, config, container) {
        var _a;
        if (config.enableDocumentation) {
            const documentationUrl = (_a = config.documentationPath) !== null && _a !== void 0 ? _a : '/documentation';
            gc_logger_1.Logger.debug(`Loading OpenAPI Spec at path: ${documentationUrl}`);
            app.get(`${documentationUrl}`, function (_req, res) {
                gc_logger_1.Logger.info('Serving documentation on request');
                const storage = routing_controllers_1.getMetadataArgsStorage();
                const config = Router.getConfig();
                if (config.versionPrefix) {
                    config.routePrefix = `${config.versionPrefix}${config.routePrefix}`;
                }
                const spec = routing_controllers_openapi_1.routingControllersToSpec(storage, config);
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