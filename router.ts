// router.ts: master router redirection file.

import { Router, RouterContext } from "./depts.ts";
import authController from "./Controllers/AuthController.ts";

const router = new Router();

router
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World 1";
  })
  .post("/api/login", authController.login)
  .post("/api/register", authController.register);

export default router;
