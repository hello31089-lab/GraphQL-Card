import { Info, Query, Resolver } from "@nestjs/graphql";
import type { GraphQLResolveInfo } from "graphql";
import { Profile } from "./dto/profile.object";
import { profileSelectFromInfo } from "./profile-select";
import { ProfileService } from "./profile.service";

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  profile(@Info() info: GraphQLResolveInfo) {
    return this.profileService.findProfile(profileSelectFromInfo(info));
  }
}
