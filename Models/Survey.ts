// Survey.ts: The survey model.
import { DataTypes, Model, Relationships } from "../depts.ts";
import User from "./User.ts";

export default class Survey extends Model {
  static table = "surveys";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      length: 50,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      length: 200,
    },
    userId: Relationships.belongsTo(User),
  };

  // Fetch an user binded to this survey
  static user() {
    return this.hasOne(User);
  }

  // Model record
  id!: number;
  name!: string;
  description!: string;
}
