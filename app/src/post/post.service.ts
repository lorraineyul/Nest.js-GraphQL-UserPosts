import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    // private userService: UserService,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepo.find();
  }

  async findOne(postId: number): Promise<Post> {
    return this.postRepo.findOne({ where: { id: postId } });
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const newPost = this.postRepo.create(createPostInput);

    return this.postRepo.save(newPost);
  }

  async remove(id: number): Promise<string> {
    const result = await this.postRepo.delete({ id });

    if (result.affected === 1) {
      return `Post with ID ${id} successfully deleted.`;
    } else {
      throw new Error(`Post with ID ${id} not found.`);
    }
  }

  // getOwner(userId: number): Promise<User> {
  //   return this.userService.findOne(userId);
  // }
}
