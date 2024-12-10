import { Register } from "./register";
import { Authenticate } from "./authenticate";
import { GetUserProfile } from "./get-user-profile";

export default {
  Register,
  Authenticate,
  GetUserProfile,
} as const;
