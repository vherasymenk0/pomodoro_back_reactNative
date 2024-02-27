import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { FlowOptionDto } from './flow-option.dto'
import { User } from '@prisma/client'

@Injectable()
export class FlowOptionService {
  constructor(private prisma: PrismaService) {}

  async updateOptions(
    { sessionCount, flowDuration, breakDuration }: FlowOptionDto,
    userId: User['id']
  ) {
    return this.prisma.flowOptions.update({
      where: { userId },
      data: { sessionCount, flowDuration, breakDuration },
    })
  }

  async getOptions(userId: User['id']) {
    return this.prisma.flowOptions.findUnique({
      where: { userId },
    })
  }
}
