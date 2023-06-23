import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { get } from 'http';
import { createWriteStream } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: false
  });

  const config = new DocumentBuilder()
    .setTitle('Gruppo - API')
    .setDescription('API do projeto Gruppo')
    .setVersion('1.0')
    .addTag('grupos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT || 3000);

  if (process.env.NODE_ENV === 'development') {

    get(
      `http://localhost:3000/swagger-ui-bundle.js`, function
      (response) {
      response.pipe(createWriteStream('swagger/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger/swagger-ui-bundle.js'`,
      );
    });

    get(`http://localhost:3000/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger/swagger-ui-init.js'`,
      );
    });

    get(
      `http://localhost:3000/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger/swagger-ui-standalone-preset.js'`,
        );
      });

    get(`http://localhost:3000/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger/swagger-ui.css'`,
      );
    });

  }
}

bootstrap();
