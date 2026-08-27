import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger as PinoNestLogger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(PinoNestLogger));

  // Bật một lần ở đây = áp cho MỌI route, kể cả route viết sau này.
  app.useGlobalPipes(
    new ValidationPipe({
      // Cắt bỏ mọi trường KHÔNG khai báo trong DTO.
      whitelist: true,
      // Có trường lạ thì báo lỗi luôn thay vì im lặng cắt bỏ.
      forbidNonWhitelisted: true,
      // Biến JSON thô thành thể hiện của class DTO (cần cho validator).
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT', 3333);

  await app.listen(port);
}
bootstrap();
