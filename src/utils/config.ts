/** The baseurl of the API, this will be prepended for all requests. */
export const API_BASE_URL = "/api";

/** The url that must be used to sign in. */
export const LOGIN_URL = "/login";

/**
 * All API endpoints must be specified here.
 * This gets used throughout the whole application.
 */
export class ApiEndpoints {
  public static login = "/login";
  public static logout = "/logout";
  public static me = "/user/@me";
  public static balance = "/user/balance";
  public static activity = "/user/activity";

  public static apps = class {
    public static usage = "/user/apps/usage";
  };
}
