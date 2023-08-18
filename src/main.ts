import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Protoss Technology')
    .setDescription('Testing Master Country Loing APIs with MongoDB')
    .setVersion('0.1Alpha')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000, () => {
    console.log('Swagger Local: http://localhost:3000/api')
  });
}
bootstrap();
