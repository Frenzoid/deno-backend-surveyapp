import { DataTypes, Model } from "../depts.ts";

export default class User extends Model {
  static table = "user";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };
}
