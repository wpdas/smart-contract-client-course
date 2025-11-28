import { contractApi } from "./near";

/**
 * Get total of posts from user
 */
export const get_greeting = () =>
  contractApi.view<object, string>("get_greeting");

/**
 * Send greeting
 */
interface SendGreeting {
  greeting: string;
}
export const set_greeting = (args: SendGreeting) =>
  contractApi.call<SendGreeting, string>("set_greeting", { args });
