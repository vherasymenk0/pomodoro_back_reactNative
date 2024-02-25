import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { config } from './config'
import { UserModule } from './user/user.module'
import { FlowOptionModule } from './flow-option/flow-option.module'
import { LogActiveDayModule } from './log-active-day/log-active-day.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }),
    UserModule,
    FlowOptionModule,
    LogActiveDayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
