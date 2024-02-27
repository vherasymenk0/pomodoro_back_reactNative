import { Module } from '@nestjs/common'
import { FlowOptionService } from './flow-option.service'
import { FlowOptionController } from './flow-option.controller'
import { PrismaService } from '../prisma.service'

@Module({
  controllers: [FlowOptionController],
  providers: [FlowOptionService, PrismaService],
})
export class FlowOptionModule {}
