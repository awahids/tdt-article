import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('api-article')
    .setDescription('The api-article API for testing')
    .setVersion('1.0')
    .addTag('api-article')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(5001);
}
bootstrap();
