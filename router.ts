// router: master router redirection file.

import { Router, RouterContext } from "./depts";
import authController from "./Controllers/AuthController";
import surveyController from "./Controllers/SurveyController";

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
  .get("/api/survey", surveyController.getSpecific)
  .get("/api/survey/:id", surveyController.getMySurveys)
  .post("/api/survey", surveyController.create)
  .put("/api/survey", surveyController.update)
  .delete("/api/survey/:id", surveyController.delete);

export default router;
