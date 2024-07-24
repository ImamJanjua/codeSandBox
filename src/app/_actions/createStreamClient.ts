"use server";
import { StreamClient } from "@stream-io/node-sdk";

export async function createStreamClient() {
  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!
  );
  return streamClient;
}
