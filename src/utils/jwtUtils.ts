import jwt, { Secret } from "jsonwebtoken";

export function verifyJwt(token: string) {
  try {
    const SECRET_KEY: Secret = process.env.JWT_SECRET || ''
    const decoded = jwt.verify(token, SECRET_KEY)
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}