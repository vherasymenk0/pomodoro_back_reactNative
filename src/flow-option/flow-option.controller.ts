import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { FlowOptionService } from './flow-option.service'
import { Auth } from '../auth/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { User } from '@prisma/client'
import { FlowOptionDto } from './flow-option.dto'

@Controller('flow-options')
export class FlowOptionController {
  constructor(private readonly flowOptionService: FlowOptionService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async updateOptions(@CurrentUser('id') userId: User['id'], @Body() dto: FlowOptionDto) {
    return this.flowOptionService.updateOptions(dto, userId)
  }

  @Get()
  @Auth()
  async getOptions(@CurrentUser('id') userId: User['id']) {
    return this.flowOptionService.getOptions(userId)
  }
}
