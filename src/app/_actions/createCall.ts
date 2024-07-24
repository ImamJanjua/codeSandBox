"use server";
import { createStreamClient } from "./createStreamClient";

export async function createCall() {
  const streamClient = await createStreamClient();
  const callType = "default";
  const callId = "12345";
  const call = streamClient.video.call(callType, callId);

  // create a call
  call.create({
    ring: true,
    data: {
      created_by_id: "nxst",
      members: [{ user_id: "57b61341-b8e2-407f-9b7d-93e76abb4757" }],
    },
  });
}
