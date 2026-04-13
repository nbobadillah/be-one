import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';

const TaskStatuses = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const;

export type TaskStatus = (typeof TaskStatuses)[keyof typeof TaskStatuses];

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  description?: string;

  @IsEnum(TaskStatuses)
  @IsOptional()
  status?: TaskStatus;
}
