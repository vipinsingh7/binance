import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(() => ({ userId: 1 })), // Mock implementation of JwtService
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(() => true), // Mock implementation of Reflector
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET') return 'mock-secret';
              return null;
            }), // Mock implementation of ConfigService
          },
        },
      ],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    reflector = module.get<Reflector>(Reflector);
    configService = module.get<ConfigService>(ConfigService);

    authGuard = new AuthGuard(jwtService, reflector, configService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  // Add additional tests here as needed
});
