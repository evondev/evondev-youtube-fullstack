import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment, {
    message: 'NODE_ENV must be development | production | test',
  })
  NODE_ENV!: Environment;

  @IsInt({ message: 'PORT must be an integer' })
  @Min(1, { message: 'PORT must be greater than 0' })
  @Max(65535, { message: 'PORT must be less than or equal to 65535' })
  PORT!: number;

  @IsString()
  @MinLength(16, { message: 'JWT_SECRET must be at least 16 characters' })
  JWT_SECRET!: string;

  @IsString()
  DATABASE_URL!: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const parsed = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(parsed, { skipMissingProperties: false });
  if (errors.length > 0) {
    const details = errors
      .flatMap((error) => Object.values(error.constraints || {}))
      .map((line) => `- ${line}`)
      .join('\n');
    throw new Error(`Environment validation failed:\n${details}`);
  }
  return parsed;
}
