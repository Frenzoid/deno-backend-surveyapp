// relations: file which contains all relations, executed on server after database is synced.

import { User } from "../Models/User";
import { Survey } from "../Models/Survey";

// Execute Relations:
export function SubmitRelations() {
  // User has many Surveys, and a Survey has one User.
  Survey.user = () => Survey.hasOne(User);
  User.surveys = () => User.hasMany(Survey);
}
