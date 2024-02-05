import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignupInput } from './input/user.signupinput';
import { ErrorResponse } from './shared/errorResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async signup(signupInput: SignupInput): Promise<ErrorResponse[] | null> {
    const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } })

    if(userExist) {
      return [
        {
          path:"email",
          message:"invalid email or password"
        }
      ]
    }
    await this.userRepo.save({
      ...signupInput,
      // equal to:
      // email:signupInput.email,
      // userName:signupInput.userName,
      // password:signupInput.password
    })
    return null;
  }

}
