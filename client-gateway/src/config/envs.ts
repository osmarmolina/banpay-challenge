import 'dotenv/config';
import * as joi from 'joi';

export interface EnvConfig {
  PORT: string;
  NATS_SERVERS: string[];
}

const schema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = schema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error)
  throw new Error(
    `Config Auth microservice validation error: ${error.message}`,
  );

const envVars: EnvConfig = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
};
