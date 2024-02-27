import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { LogActiveDayDto } from './log-active-day.dto'
import { User } from '@prisma/client'
import * as dayjs from 'dayjs'

const currentDay = dayjs().format('YYYY-MM-DD')

@Injectable()
export class LogActiveDayService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate({ sessionCount }: LogActiveDayDto, userId: User['id']) {
    const detectedLog = await this.prisma.logActiveDay.findFirst({
      where: {
        userId,
        createAt: {
          gte: new Date(currentDay + 'T00:00:00'),
          lte: new Date(currentDay + 'T23:59:59'),
        },
      },
    })

    if (detectedLog) {
      return this.prisma.logActiveDay.update({
        where: { id: detectedLog.id },
        data: { sessionCount },
      })
    } else {
      return this.prisma.logActiveDay.create({
        data: { userId, sessionCount },
      })
    }
  }

  async getStatistics(userId: User['id']) {
    const logs = await this.prisma.logActiveDay.findMany({
      where: { userId },
      orderBy: {
        createAt: 'desc',
      },
      select: {
        sessionCount: true,
        createAt: true,
      },
    })

    const groupedByMonth = logs.reduce((acc, log) => {
      const month = log.createAt.toISOString().substring(0, 7)
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(log)
      return acc
    }, {})

    return groupedByMonth
  }
}
