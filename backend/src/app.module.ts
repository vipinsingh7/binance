import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/JwtStrategy';
import { LocalStrategy } from './auth/local.strategy';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { User } from './user/entities/user.entity';


@Module({
  imports: [
    // Serve static files from the 'uploads' directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path to serve the files from
    }),

    // Configure TypeORM for PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5400,
      username: 'postgres',
      password: 'root',
      database: 'binance_auth',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true, // Automatically sync entities with the database (disable in production)
    }),

    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true, // Ensure ConfigModule is global
      envFilePath: 'src/.env', // Path to your .env file
    }),

    // Import feature modules
    UserModule,
   
    AuthModule,
  
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AppModule {}
