import { RouterContext, hashSync, compareSync } from "../depts.ts";
import User from "../Models/User.ts";

class AuthController {
  async login(ctx: RouterContext) {
  }

  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();

    let user = (await User.where("email", email).limit(1).get())[0]; // getOne

    if (user) {
      // If user exists, return an error with error code.

      ctx.response.status = 422;
      ctx.response.body = { message: "Email already in use." };
      return;
    } else {
      // otherwise, encrypt password, create user, return created user.
      const hashedPassword = hashSync(password);
      user = await User.create({ name, email, password: hashedPassword });

      // we delete the password property before sending it back to the claimant.
      delete user.password;

      ctx.response.status = 201;
      ctx.response.body = { user };
    }
  }
}

const authController = new AuthController();
export default authController;
