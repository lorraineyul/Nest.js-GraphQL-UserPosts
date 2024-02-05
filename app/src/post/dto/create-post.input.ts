import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  body: string;

  @Field(type => Int)
  authorId: number;
}