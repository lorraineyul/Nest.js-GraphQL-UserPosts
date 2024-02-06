import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  body: string;

  @Column()
  @Field(type => Int)
  userId: number;

  @ManyToOne(() => User, user => user.post)
  @Field(type => User)
  user: User
}
