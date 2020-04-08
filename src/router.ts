import 'reflect-metadata';

import Express from 'express';
import { getMetadataArgsStorage, useContainer, IocAdapter, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { Logger } from '@adhityan/gc-logger';
import { RoutingOptions } from './types'

export class Router {
    private static routerConfig: RoutingOptions;

    public static initialize(app: Express.Application, config: RoutingOptions, container: IocAdapter) {
        if(config.enableDocumentation) {
            const documentationUrl = config.documentationPath??'/documentation';
            Logger.debug(`Loading OpenAPI Spec at path: ${documentationUrl}`);
            
            app.get(`${documentationUrl}`, function (_req, res) {
                Logger.info('Serving documentation on request');
                const storage = getMetadataArgsStorage()
                const config = Router.getConfig();

                if(config.versionPrefix) {
                    config.routePrefix = `${config.versionPrefix}${config.routePrefix}`;
                }

                const spec = routingControllersToSpec(storage, config);
                res.json(spec);
            });
        }

        if(container) useContainer(container);
        useExpressServer(app, config);

        Router.routerConfig = config;
    }

    public static getConfig(): RoutingOptions {
        return Router.routerConfig;
    }
}