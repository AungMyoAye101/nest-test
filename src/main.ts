import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HTTPExpectionFilter } from './common/filter/http-expection.fliter';
import { ResponseFormatter } from './common/interceptor/response.interceptor';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HTTPExpectionFilter())
  app.useGlobalInterceptors(new ResponseFormatter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
