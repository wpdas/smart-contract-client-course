import { contractApi } from "./near";

/**
 * Get total of posts from user
 */
export const get_greeting = () =>
  contractApi.view<object, string>("get_greeting");
