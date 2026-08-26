import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
