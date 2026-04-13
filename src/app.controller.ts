import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'Workshop API running',
      endpoints: ['/products', '/tasks', '/users'],
    };
  }
}
