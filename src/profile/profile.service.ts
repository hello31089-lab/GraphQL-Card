import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findProfile(select: Prisma.ProfileSelect) {
    return this.prisma.profile.findFirstOrThrow({
      select,
    });
  }
}
