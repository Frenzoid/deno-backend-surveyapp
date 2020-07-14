import { Jose, Payload, setExpiration } from "../depts.ts";

export const key: string = Deno.env.get("JWT_SECRET")!;
export const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export const createPayload = (keydata: string, time: number): Payload => {
  const payload: Payload = {
    iss: keydata,
    exp: setExpiration(new Date().getTime() + time), // 1h
  };

  return payload;
};
