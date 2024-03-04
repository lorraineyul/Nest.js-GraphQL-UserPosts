import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupInput } from './input/user.signupinput';
import { ErrorResponse } from './shared/errorResponse';
import { LoginInput } from './input/user.logininput';
import { errorMessage } from './shared/errorMessage';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { MyContext } from 'src/types/myContext';
import session from 'express-session';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExist = await this.userRepo.findOne({
      where: { email: signupInput.email },
    });

    if (userExist) {
      return errorMessage('email', 'invalid email or password');
    }
    await this.userRepo.save({
      ...signupInput,
      // equal to:
      // email:signupInput.email,
      // userName:signupInput.userName,
      // password:signupInput.password
    });
    return null;
  }

  async login(
    loginInput: LoginInput,
    req: Request,
  ): Promise<ErrorResponse[] | null> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email },
    });

    if (!user) {
      return errorMessage('email', 'invalid email');
    }

    const checkPassword = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!checkPassword) {
      return errorMessage('password', 'invalid password');
    }
    req.session.userId = user.id;
    return null;
  }

  async logout(ctx: MyContext) {
    await ctx.req.session.destroy((err) => {
      console.log(err);
      return false;
    });
    await ctx.res.clearCookie("userposts")
    return true;
  }
}
