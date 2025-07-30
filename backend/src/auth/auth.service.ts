import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AccessToken } from './access-token.interface';
import { Role } from 'src/user/Role';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: any = await this.userService.findOneBy(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async login(email: string, password: string): Promise<AccessToken> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new BadRequestException('Account not verified');
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      username: user.name,
      
    };

    return { ...payload,access_token: this.jwtService.sign(payload) };
  }

  async register(userDto: CreateUserDto): Promise<String> {
      console.log("dto");

    const existingUser = await this.userService.findOneBy(userDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    userDto.isEmailVerified = false;
    userDto.role = Role.CLIENT;

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser: any = { ...userDto, password: hashedPassword };

    await this.userService.create(newUser);

    const token = this.jwtService.sign(
      { email: userDto.email, purpose: 'verify' },
      { expiresIn: '15m' }
    );

    await this.sendVerificationEmailLink(userDto.email, token);
      return JSON.stringify({ message: 'User registered successfully' }) ;

  }

  async verifyAccount(token: string, profileData: Partial<User>): Promise<string> {
    try {
      const payload: any = this.jwtService.verify(token);

      if (payload.purpose !== 'verify') {
        throw new BadRequestException('Invalid token');
      }

      const user = await this.userService.findOneBy(payload.email);
      if (!user) throw new BadRequestException('User not found');

      if (user.isEmailVerified) {
        throw new BadRequestException('Already verified');
      }

      Object.assign(user, { isEmailVerified: true, ...profileData });
      await this.userService.update(user.id, user);
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
    return "Account Verified Successfully"
  }

  async sendPasswordResetLink(email: string): Promise<void> {
    const user = await this.userService.findOneBy(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const token = this.jwtService.sign(
      { email: user.email, purpose: 'reset' },
      { expiresIn: '15m' }
    );

    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    await this.sendEmail(
      email,
      'Reset Your Password',
      `<p>Click the link below to reset your password:</p>
       <a href="${resetUrl}">${resetUrl}</a>`
    );
  }

  async updatePassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload: any = this.jwtService.decode(token);
      if (payload.purpose !== 'reset') {
        throw new BadRequestException('Invalid token');
      }
      console.log(payload)
      const user = await this.userService.findOneBy(payload.email);
      if (!user) throw new BadRequestException('User not found');

      const hashed = await bcrypt.hash(newPassword, 10);
            console.log(user.password)

      user.password = hashed;
            console.log(hashed)

      await this.userService.update(user.id, user);
    } catch (e ){
      throw new BadRequestException(e.message);
    }
  }

  async reverify(email: string): Promise<void> {
    const user = await this.userService.findOneBy(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('User is already verified');
    }

    const token = this.jwtService.sign(
      { email: user.email, purpose: 'verify' },
      { expiresIn: '15m' }
    );

    await this.sendVerificationEmailLink(email, token);
  }

  private async sendVerificationEmailLink(email: string, token: string): Promise<void> {
    const verificationUrl = `http://localhost:5173/verify?token=${token}`;
    const html = `
      <h3>Verify your email</h3>
      <p>Click the link below to verify your account:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `;

    await this.sendEmail(email, 'Email Verification', html);
  }

  private async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  }
}
