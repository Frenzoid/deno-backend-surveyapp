// Users.ts: The user model.
import { DataTypes, Model } from "../depts.ts";
import Survey from "./Survey.ts";

export enum UserRoles {
  ADMIN,
  USER,
}

export class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.enum([UserRoles.ADMIN, UserRoles.USER]),
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
  role!: UserRoles;
}
