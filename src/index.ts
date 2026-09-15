import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import "dotenv/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origin =
    typeof process.env.ALLOWED_ORIGIN === "string"
      ? process.env.ALLOWED_ORIGIN.split(",").map(o => o.trim())
      : ["http://localhost:3000"];

  app.enableCors({
    origin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "apollo-require-preflight",
      "x-apollo-operation-name",
    ],
  });
  app.getHttpAdapter().get("/", (_, response) => {
    response.redirect("/graphql");
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
