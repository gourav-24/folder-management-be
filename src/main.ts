import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';



//import { Callback } from 'vercel';
import serverlessExpress from '@vendia/serverless-express';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Enable CORS if required
  await app.init();
  console.log('SERVER getting started>>>>>>>>>>>>>>>');
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverlessExpress({ app: expressApp });
}

bootstrap();

export const handler = (event, context) => {
  if (!server) {
    bootstrap().then(() => server(event, context));
  } else {
    return server(event, context);
  }
};

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());
//   app.enableCors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // If you need to allow cookies
//   });

//   await app.listen(process.env.PORT ?? 8000);
// }
// bootstrap();

// TO:DO1: Run app
// TO:DO2: Global try catch
// TO:DO3: Integrate API's and test
// TO:DO4: Read about prisma. 
