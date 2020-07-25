import { RouterContext } from "../depts.ts";
import Survey from "../Models/Survey.ts";
import { User } from "../Models/User.ts";
import { getCurrentUser } from "../utils/jwtutil.ts";

class SurveyController {
  async getMySurveys(ctx: RouterContext) {
    const user = await getCurrentUser(ctx.request.headers);
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Couldn't get current user.",
      };
      return;
    }

    const surveys = User.where({ id: user.id }).surveys();
    ctx.response.status = 201;
    ctx.response.body = { surveys };
  }

  async getSpecific(ctx: RouterContext) {
    const id = ctx.params.id;
    if (!id) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "No id specified.",
      };
      return;
    }

    const survey = await Survey.where(id).first();
    ctx.response.status = 201;
    ctx.response.body = { survey };
  }

  async create(ctx: RouterContext) {
    const { value: { name, description } } = await ctx.request.body(
      { type: "json" },
    ).value;

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
    const id = ctx.params.id;
    if (!id) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "No id specified.",
      };
      return;
    }

    const { value: { name, description } } = await ctx.request.body(
      { type: "json" },
    ).value;

    const survey: Survey = await Survey.where(id).first();

    survey.name = name;
    survey.description = description;
    const updatedSurvey: Survey = await survey.save();

    ctx.response.status = 201;
    ctx.response.body = { updatedSurvey };
  }

  async delete(ctx: RouterContext) {
    const id = ctx.params.id;
    if (!id) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "No id specified.",
      };
      return;
    }

    const survey: Survey = await Survey.where(id).first();
    const deleted = await survey.delete();

    ctx.response.status = 201;
    ctx.response.body = { deleted };
  }
}

const surveyController = new SurveyController();
export default surveyController;
