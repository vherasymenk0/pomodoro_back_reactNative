import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(8, {
    message: 'Should be 8 or more',
  })
  @IsString()
  password: string
}
