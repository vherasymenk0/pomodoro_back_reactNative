import { Controller } from '@nestjs/common'
import { LogActiveDayService } from './log-active-day.service'

@Controller('log-active-day')
export class LogActiveDayController {
  constructor(private readonly logActiveDayService: LogActiveDayService) {}
}
