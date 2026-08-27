import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { validateEnv } from './config/env.validation';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: (req, res) => {
          const incoming = req.headers['x-request-id'];
          const id =
            typeof incoming === 'string' && incoming.trim() !== ''
              ? incoming
              : randomUUID();
          res.setHeader('x-request-id', id); // trả lại cho client
          return id;
        },
        redact: {
          paths: [
            'req.headers.authorization', // token Bearer
            'req.headers.cookie', // session
            'req.body.password',
            '*.password', // mọi field tên password, ở BẤT KỲ object nào
            '*.jwtSecret',
          ],
          censor: '[DA CHE]', // chuỗi thay thế
        },
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  translateTime: 'HH:MM:ss',
                  // Giấu bớt cho log dev dễ đọc; bản JSON production vẫn giữ ĐỦ.
                  ignore: 'pid,hostname,context,req,res,responseTime',
                  // Tự dựng dòng hiển thị: [id] [class] nội dung
                  messageFormat: '[{req.id}] [{context}] {msg}',
                },
              }
            : undefined,
      },
    }),
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
