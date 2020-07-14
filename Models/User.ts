// Users.ts: The user model.
import { DataTypes, Model } from "../depts.ts";
import Survey from "./Survey.ts";

export default class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50,
    },
    password: DataTypes.STRING,
  };

  // Fetch surveys binded to this user
  static surveys() {
    return this.hasMany(Survey);
  }

  // Model record
  id!: number;
  name!: string;
  email!: string;
  password!: string;
}
