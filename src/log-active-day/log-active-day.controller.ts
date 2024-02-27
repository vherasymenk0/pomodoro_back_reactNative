import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { LogActiveDayService } from './log-active-day.service'
import { LogActiveDayDto } from './log-active-day.dto'
import { Auth } from '../auth/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { User } from '@prisma/client'

@Controller('log-active-day')
export class LogActiveDayController {
  constructor(private readonly logActiveDayService: LogActiveDayService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createOrUpdate(@CurrentUser('id') userId: User['id'], @Body() dto: LogActiveDayDto) {
    return this.logActiveDayService.createOrUpdate(dto, userId)
  }

  @Get('statistics')
  @Auth()
  async getStatistics(@CurrentUser('id') userId: User['id']) {
    return this.logActiveDayService.getStatistics(userId)
  }
}
