import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import type { Course } from './course.interface';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';

// Mọi route trong class này đều bắt đầu bằng /courses
@Controller('courses')
export class CoursesController {
  // Nest TỰ tạo CoursesService và đưa vào đây — ta không hề gọi `new`.

  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@Query('level') level?: string): Course[] {
    return this.coursesService.findAll(level);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Course {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCourseDto): Course {
    return this.coursesService.create(dto);
  }
}
