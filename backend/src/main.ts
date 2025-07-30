import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS globally
  app.enableCors({
    origin: '*', // Allow specific origins
  
    credentials: true, // Allow cookies and credentials
  });

  await app.listen(3000); // Start the server
}
bootstrap();