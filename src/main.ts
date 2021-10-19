import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The Users API description')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token'},
      'access-token'
    ).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
