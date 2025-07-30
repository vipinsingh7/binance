import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from './public-strategy';
import { LoginDto } from 'src/dto/login.dto';
import { ResetPasswordDto } from 'src/dto/reset-passwor.dto';
import { ReverifyDto } from 'src/dto/reverify.dto';
import { VerifyAccountDto } from 'src/dto/verify-account.dto';
import { UpdatePasswordDto } from 'src/dto/update-password.dto';
@Public()
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  
@Public()
  @Post('register')
register(@Body() dto: CreateUserDto) {
  
  return this.authService.register(dto);
}

@Post('login')
login(@Body() dto: LoginDto) {
  return this.authService.login(dto.email, dto.password);
}

@Post('verify')
verify(@Body() dto: VerifyAccountDto) {
  return this.authService.verifyAccount(dto.token, dto);
}

@Post('reset-password')
resetPassword(@Body() dto: ResetPasswordDto) {
  return this.authService.sendPasswordResetLink(dto.email);
}

@Post('update-password')
updatePassword(@Body() dto: UpdatePasswordDto) {
  return this.authService.updatePassword(dto.token, dto.password);
}

@Post('reverify')
reverify(@Body() dto: ReverifyDto) {
  return this.authService.reverify(dto.email);
}

}
