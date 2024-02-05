import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput {
  @Field()
  body: string;

  @Field(type => Int)
  userId: number;
}