// export default () => ({
//     port: parseInt(process.env.PORT ?? "3000", 10) || 3000,
//     database: {
//         host: process.env.HOST,
//         port: parseInt(process.env.DATABASE_PORT ?? "5432", 10) || 5432
//     }
// })


import * as yaml from "js-yaml"
import { readFileSync } from "node:fs";
import { join } from "node:path";

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
    const config = yaml.load(
        readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf-8')
    ) as Record<string, any>
    if (config.http.port < 1024 || config.http.port > 49151) {
        throw new Error('HTTP port must be between 1024 and 49151');
    }

    return config;
}