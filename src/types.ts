import { RoutingControllersOptions } from "routing-controllers";
import { OpenAPIObject } from 'openapi3-ts';

export type RoutingOptions = RoutingControllersOptions & ({ 
    enableDocumentation: true,
    documentationPath?: string,
    documentationParameters?: Partial<OpenAPIObject> | {
        title: string,
        baseUrl: string,
        description: string
    }
} | { 
    enableDocumentation?: false
})