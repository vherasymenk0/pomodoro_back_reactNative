import { Controller } from '@nestjs/common'
import { FlowOptionService } from './flow-option.service'

@Controller('flow-option')
export class FlowOptionController {
  constructor(private readonly flowOptionService: FlowOptionService) {}
}
