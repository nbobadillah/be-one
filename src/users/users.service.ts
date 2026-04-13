import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Maria',
      email: 'maria@example.com',
      age: 25,
      role: 'student',
    },
    {
      id: 2,
      name: 'Carlos',
      email: 'carlos@example.com',
      age: 38,
      role: 'teacher',
    },
  ];
  private nextId = 3;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      name: dto.name,
      email: dto.email,
      age: dto.age,
      role: dto.role ?? 'student',
    };
    this.users.push(user);
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.findOne(id);
    Object.assign(user, dto);
    return user;
  }

  remove(id: number): User {
    const user = this.findOne(id);
    this.users = this.users.filter((item) => item.id !== id);
    return user;
  }
}
