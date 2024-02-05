import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignupInput } from './input/user.signupinput';
import { ErrorResponse } from './shared/errorResponse';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => [ErrorResponse], {nullable: true})
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<object[] | null> {
    return this.userService.signup(signupInput);
  }
}

