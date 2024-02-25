import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './auth.dto'
import { hash, verify } from 'argon2'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)

    return {
      user: this.returnUserFields(user),
      accessToken: await this.issueAccessToken(user.id),
    }
  }

  async register(dto: AuthDto) {
    const existUser = this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (existUser) throw new BadRequestException('User already exist')

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await hash(dto.password),
      },
    })

    return {
      user: this.returnUserFields(newUser),
      accessToken: this.issueAccessToken(newUser.id),
    }
  }

  async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: { id: true, email: true, password: true },
    })

    if (!user) throw new NotFoundException('User not found')

    const isValidPassword = await verify(dto.password, user.password)

    if (!isValidPassword) throw new UnauthorizedException('Incorrect password')

    return user
  }

  async returnUserFields(user: Pick<User, 'id' | 'email'>) {
    return {
      id: user.id,
      email: user.email,
    }
  }

  async issueAccessToken(userId: number) {
    const data = {
      id: userId,
    }

    return await this.jwtService.signAsync(data, {
      expiresIn: '14d',
    })
  }
}
