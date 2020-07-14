// router.ts: master router redirection file.

import { Router, RouterContext } from "./depts.ts";
import authController from "./Controllers/AuthController.ts";
import surveyController from "./Controllers/SurveyController.ts";

const router = new Router();

router
  // Main
  .get("/", (ctx: RouterContext) => {
    ctx.response.body = "Hello World 1";
  })
  // AuthController
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // SurveyController
  .get("/api/survey", surveyController.getAllForUser)
  .get("/api/survey/:id", surveyController.getSigle)
  .post("/api/survey", surveyController.create)
  .put("/api/survey", surveyController.update)
  .delete("/api/survey/:id", surveyController.delete);

export default router;
