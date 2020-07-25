// Users.ts: The user model.
import { DataTypes, Model, Relationships } from "../depts.ts";
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

  // This function is rewritten on database/relations.ts
  static surveys() {}

  // Model record
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: UserRoles;
  surveys!: Survey[];
}
