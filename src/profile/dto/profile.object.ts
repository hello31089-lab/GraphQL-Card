import {Field, ID, ObjectType} from "@nestjs/graphql"

@ObjectType()
export class Skill {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
export class Experience {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field()
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class Project {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  url!: string;
}

@ObjectType()
export class Profile {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  githubUrl?: string;

  @Field({ nullable: true })
  linkedinUrl?: string;

  @Field({ nullable: true })
  otherUrl?: string;

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience])
  experiences!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
