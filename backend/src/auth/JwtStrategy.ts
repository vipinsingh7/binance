import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './access-token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    
    // Ensure JWT_SECRET is always a string or throw an error if undefined
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables!');
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Use the JWT secret, which is guaranteed to be a string
    };

    super(options); // Pass options correctly
  }

  async validate(payload: AccessTokenPayload) {
    return payload; // Add any custom validation logic here if needed
  }
}
