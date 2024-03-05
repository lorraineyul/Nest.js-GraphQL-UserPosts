import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SESSION_SECRET } from './constants';
import { createClient } from 'redis';
import * as Store from 'connect-redis'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const RedisStore = require("connect-redis").default
  
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      store: redisStore,
      name: 'userposts',
      secret: SESSION_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
