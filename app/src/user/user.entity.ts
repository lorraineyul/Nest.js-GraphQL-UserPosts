import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Post, post => post.user)
  @Field(type => [Post], {nullable: true})
  post?: Post[];
}
