// AuthController.ts: The auth controller for the rotuer.
import {
  RouterContext,
  compareSync,
  makeJwt,
  hashSync,
} from "../depts.ts";
import { key, header, createPayload } from "../utils/jwtutil.ts";
import { User, UserRoles } from "../Models/User.ts";

class AuthController {
  // POST Login route method.
  async login(ctx: RouterContext) {
    const { value: { email, password } } = await ctx.request.body();
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Missing contents, Please provide email and password.",
      };
      return;
    }

    let user = await User.where(email).first();

    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = { message: "User doesn't exist with this email!" };
      return;
    }

    if (!compareSync(password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = { message: "Incorrect password." };
      return;
    }

    const payload = createPayload(user.email, 60 * 60 * 1000);
    const jwt = makeJwt({ key, header, payload });

    delete user.password;

    ctx.response.status = 201;
    ctx.response.body = { user, jwt };
  }

  // POST Register route method.
  async register(ctx: RouterContext) {
    const { value: { name, email, password } } = await ctx.request.body();
    if (!email || !password) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Missing contents, Please provide email and password.",
      };
      return;
    }

    let user = await User.where(email).first();

    if (user) {
      // If user exists, return an error with error code.

      ctx.response.status = 422;
      ctx.response.body = { message: "Email already in use." };
      return;
    }

    // otherwise, encrypt password, create user, return created user.
    const hashedPassword = hashSync(password);
    user = await User.create(
      { name, email, password: hashedPassword, role: UserRoles.USER },
    );

    // we delete the password property before sending it back to the claimant.
    delete user.password;

    ctx.response.status = 201;
    ctx.response.body = { user };
  }
}

const authController = new AuthController();
export default authController;
