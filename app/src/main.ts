import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SESSION_SECRET } from './constants';
import { createClient } from 'redis';
import * as connectRedis from 'connect-redis';


async function bootstrap() {
  const RedisStore = require("connect-redis").default
  
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: redisStore,
      name: 'userposts',
      secret: SESSION_SECRET,
      cookie: {
        httpOnly: true,
        secure: true,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
