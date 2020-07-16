// relations.ts: file which contains all relations, executed on server.ts after database is synced.

import { User } from "../Models/User.ts";
import Survey from "../Models/Survey.ts";

// Execute Relations:
export function SubmitRelations() {
  // User has many Surveys, and a Survey has one User.
  Survey.user = () => Survey.hasOne(User);
  User.surveys = () => User.hasMany(Survey);
}
