import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Course } from './course.interface';
import { CreateCourseDto } from './dto/create-course.dto';

// @Injectable() = "class này có thể được Nest tạo và tiêm vào chỗ khác".
@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);
  private nextId = 3;
  private readonly courses: Course[] = [
    { id: 1, title: 'NestJS Fundamentals', level: 'beginner', price: 499000 },
    { id: 2, title: 'Postgres for Backend', level: 'advanced', price: 799000 },
  ];

  findAll(level?: string): Course[] {
    if (!level) return this.courses;

    return this.courses.filter((course) => course.level === level);
  }

  findOne(id: number): Course {
    this.logger.log(`Looking up course id=${id}`);
    const course = this.courses.find((item) => item.id === id);

    // Ném exception, KHÔNG tự tay writeHead(404). Nest lo phần còn lại.
    if (!course) throw new NotFoundException(`Course with id=${id} not found`);

    return course;
  }

  create(dto: CreateCourseDto): Course {
    const course: Course = { id: this.nextId++, ...dto };
    this.courses.push(course);
    return course;
  }
}
