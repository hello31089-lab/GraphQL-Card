import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: "Ан",
      description: "Fullstack Dev",
      githubUrl: "https://github.com/",
      linkedinUrl: null,
      otherUrl: "t.me/antoha_s",
      skills: {
        create: [
          { name: "TypeScript" },
          { name: "React" },
          { name: "NextJS" },
          { name: "NestJS" },
          { name: "GraphQL" },
          { name: "Prisma" },
          { name: "Docker" },
        ],
      },
      experiences: {
        create: [
          {
            company: "Bank",
            position: "Frontend Developer",
            startDate: new Date("2025-10-07"),
            achievements: [
              "Проектирование API и Frontend",
              "Оптимизация производительности БД на 40%",

            ],
          },
        ],
      },
      projects: {
        create: [
          {
            name: "Crew",
            url: ""
          }, {
            name: "Hire",
            url: ""
          }, {
            name: "Goals",
            url: ""
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });