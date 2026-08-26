import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  controllers: [CoursesController],
  // providers = những thứ Nest được phép tạo và tiêm vào trong nhóm này.
  providers: [CoursesService],
})
export class CoursesModule {}
