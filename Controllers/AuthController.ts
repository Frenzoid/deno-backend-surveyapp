import { RouterContext } from "../depts.ts";

class AuthController {
  login(ctx: RouterContext) {
  }

  register(ctx: RouterContext) {
    console.log("Register");
  }
}

const authController = new AuthController();
export default authController;
