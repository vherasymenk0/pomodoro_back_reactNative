import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { AuthModule } from './auth/auth.module'
import { FlowOptionModule } from './flow-option/flow-option.module'
import { LogActiveDayModule } from './log-active-day/log-active-day.module'
import { PrismaService } from './prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    AuthModule,
    FlowOptionModule,
    LogActiveDayModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
