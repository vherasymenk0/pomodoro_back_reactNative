import { Controller, Get } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('user')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Get('')
  async getUser() {
    return this.userService.getUser()
  }
}
