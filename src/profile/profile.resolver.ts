import { Info, Query, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Profile } from "./dto/profile.object.js";
import { profileSelectFromInfo } from "./profile-select.js";
import { ProfileService } from "./profile.service.js";

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  profile(@Info() info: GraphQLResolveInfo) {
    return this.profileService.findProfile(profileSelectFromInfo(info));
  }
}
