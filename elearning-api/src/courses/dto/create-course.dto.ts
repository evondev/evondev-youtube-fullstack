import { IsIn, IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'title must be a string' })
  @MinLength(3, { message: 'title must be at least 3 characters' })
  title!: string;

  @IsIn(['beginner', 'advanced'], {
    message: 'level must be beginner or advanced',
  })
  level!: 'beginner' | 'advanced';

  @IsInt({ message: 'price must be an integer' })
  @Min(0, { message: 'price must not be negative' })
  price!: number;
}
