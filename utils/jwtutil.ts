import { Jose, Payload, setExpiration, validateJwt } from "../depts.ts";
import { User } from "../Models/User.ts";

export const key: string = Deno.env.get("JWT_SECRET")!;
export const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const createPayload = (storedData: string, time: number): Payload => {
  const payload: Payload = {
    iss: storedData,
    exp: setExpiration(new Date().getTime() + time), // 1h
  };

  return payload;
};

export const getCurrentUser = async (headers: Headers) => {
  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    return false;
  }

  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    return false;
  }

  const data = await validateJwt(
    jwt,
    Deno.env.get("JWT_SECRET") || "",
    { algorithm: header.alg },
  );

  if (data.isValid) {
    try {
      const user = await User.where({ email: data.payload?.iss! }).first();
      return user;
    } catch (e) {
      return false;
    }
  }

  return false;
};
