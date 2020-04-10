import 'reflect-metadata';

import Express from 'express';
import { getMetadataArgsStorage, useContainer, IocAdapter, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { Logger } from '@adhityan/gc-logger';
import { RoutingOptions } from './types';

import path from 'path';
import readPkgUp from 'read-pkg-up';
import parentModule from 'parent-module';

export class Router {
    private static routerConfig: RoutingOptions;

    public static initialize(app: Express.Application, config: RoutingOptions, container: IocAdapter) {
        if(config.enableDocumentation) {
            const documentationUrl = '/openapi'; //not allowed to customize it because we want to load an external swagger for this
            Logger.debug(`Loading OpenAPI Spec at path: ${documentationUrl}`);
            const parent = parentModule();

            app.get(`${documentationUrl}`, function (_req, res) {
                Logger.info('Serving documentation on request');
                const storage = getMetadataArgsStorage();

                if(parent && config.documentationParameters?.baseUrl) {
                    const parentJson = readPkgUp.sync({cwd: path.dirname(parent)})?.packageJson;
                    const version = parentJson?.version;

                    if(version) {
                        Logger.debug(`Auto detected root package version ${version}`);
                        const description = config.documentationParameters.description ?? parentJson?.description;
                        const title = config.documentationParameters.title ?? parentJson?.name;

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
                        }
                    }
                }
                
                const spec = routingControllersToSpec(storage, config, config.documentationParameters);

                res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
                res.setHeader('Access-Control-Allow-Methods', 'GET');
                res.setHeader('Access-Control-Allow-Origin', '*');
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