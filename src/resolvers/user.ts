import { Link } from '../entities/Link';
import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import argon2 from 'argon2';
import { MyContext } from 'src/types';
import { User } from '../entities/User';


@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [Link])
  links(@Ctx() { em }: MyContext): Promise<Link[]> {
    return em.find(Link, {});
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { em,req }: MyContext
  ){
    
    if(!req.session.userId){

        return null
    }

    const user = await em.findOne(User,{id:req.session.userId})
    return user
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') Options: UsernamePasswordInput,
    @Ctx() { em , req}: MyContext
  ): Promise<UserResponse> {
    if (Options.username.length < 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'length must be greater than 2 ',
          },
        ],
      };
    }
    if (Options.password.length <= 7) {
      return {
        errors: [
          {
            field: 'password',
            message: 'length must be atleast 8 characters ',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(Options.password);
    const user = em.create(User, {
      username: Options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === '23505' || err.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'username has already been taken',
            },
          ],
        };
      }
    }

    req.session!.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') Options: UsernamePasswordInput,
    @Ctx() { em , req}: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: Options.username });

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: 'user name doesnt exist',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, Options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    req.session!.userId = user.id;

    return {
      user,
    };
  }
}
