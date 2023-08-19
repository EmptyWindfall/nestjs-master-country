import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Protoss Technology')
    .setDescription('Testing Master Country Loing APIs with MongoDB')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT',
    )
    .setVersion('0.1Alpha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      excludeExtraneousValues: true,
      excludePrefixes: ['_'],
    }
  }));
  
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('app.port')
  const nodeEnv = configService.get('app.nodeEnv')
  await app.listen(port, () => {
    if (nodeEnv === 'development') {
      console.log(`Swagger: http://localhost:${port}/api`)
    }
  });
}
bootstrap();
