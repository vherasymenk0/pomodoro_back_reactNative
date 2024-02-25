import { Module } from '@nestjs/common'
import { FlowOptionService } from './flow-option.service'
import { FlowOptionController } from './flow-option.controller'

@Module({
  controllers: [FlowOptionController],
  providers: [FlowOptionService],
})
export class FlowOptionModule {}
