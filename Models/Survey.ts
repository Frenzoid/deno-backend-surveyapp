// Survey.ts: The survey model.
import { DataTypes, Model } from "../depts.ts";

export default class Survey extends Model {
  static table = "survey";
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
  };

  // Model record
  id!: number;
  name!: string;
  description!: string;
}
