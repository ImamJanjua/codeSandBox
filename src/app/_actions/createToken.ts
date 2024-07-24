"use server";
import { createStreamClient } from "./createStreamClient";

export async function createToken() {
  const streamClient = await createStreamClient();

  const userId = "57b61341-b8e2-407f-9b7d-93e76abb4757";

  // exp is optional (by default the token is valid for an hour)
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const token = streamClient.createToken(userId, exp);

  return token;
}
