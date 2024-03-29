import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { User } from 'src/user/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [Post])
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Query(() => Post)
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return this.postService.create(createPostInput);
  }

  @Mutation(() => Post)
  updatePost(@Args('id', { type: () => Int }) id: number,
              @Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(id, updatePostInput);
  }

  @Mutation(() => Boolean)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
  
}
