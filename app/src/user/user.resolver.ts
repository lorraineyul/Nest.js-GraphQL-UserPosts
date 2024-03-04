import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { SignupInput } from './input/user.signupinput';
import { ErrorResponse } from './shared/errorResponse';
import { LoginInput } from './input/user.logininput';
import { MyContext } from 'src/types/myContext';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
 
  @Mutation(() => [ErrorResponse], { nullable: true })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<object[] | null> {
    return this.userService.signup(signupInput);
  }

  @Mutation(() => [ErrorResponse], { nullable: true })
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext,
    ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req);
  }

  @Mutation(() => Boolean)
  async logout(@Context() ctx:MyContext){
    return this.userService.logout(ctx)
  }
}
