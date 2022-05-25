import dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num({ default: 4000 }),
  FRONTEND_URL: str(),
  JWT_COOKIE: str({ default: "id" as string, devDefault: "id_dev" }),
  JWT_SECRET: str(),
  JWT_EXPIRES: num({
    default: 60 * 60 * 24 * 14, // 14 days
  }),
});
