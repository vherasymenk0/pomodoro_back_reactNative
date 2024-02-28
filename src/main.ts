import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('port')
  const clientUrl = configService.get<string>('clientUrl')

  console.log('clientUrl -->', clientUrl)
  app.enableCors({
    origin: clientUrl,
  })
  app.setGlobalPrefix('api')
  await app.listen(port)
}
bootstrap()
