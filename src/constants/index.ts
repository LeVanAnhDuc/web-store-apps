import ROUTES from "./routes";
import FIELD_NAMES from "./fieldNames";
import STORAGE_KEYS from "./storageKeys";
import FORGOT_PASSWORD from "./forgotPassword";
import CONTACT_ADMIN from "./contactAdmin";
import LOGIN from "./login";
import SIGNUP from "./signup";

const CONSTANTS = {
  ROUTES,
  FIELD_NAMES,
  REGEX_EMAIL:
    /^[a-zA-Z0-9](?:[a-zA-Z0-9]|(?<![.])[.](?![.]))*[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  STORAGE_KEYS,
  FORGOT_PASSWORD,
  CONTACT_ADMIN,
  LOGIN,
  SIGNUP
};

export default CONSTANTS;
