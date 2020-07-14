import { RouterContext } from "../depts.ts";
import Survey from "../Models/Survey.ts";

class SurveyController {
  async getAllForUser(ctx: RouterContext) {
  }

  async getSigle(ctx: RouterContext) {
  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body();
    if (!name || !description) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Missing contents, Please provide name and description.",
      };
      return;
    }

    const survey = await Survey.create({ name, description });
    ctx.response.status = 201;
    ctx.response.body = { survey };
  }

  async update(ctx: RouterContext) {
  }

  async delete(ctx: RouterContext) {
  }
}

const surveyController = new SurveyController();
export default surveyController;
