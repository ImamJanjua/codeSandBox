"use client";
import React from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

import { createToken } from "@/app/_actions/createToken";

// example user
const user_id = "57b61341-b8e2-407f-9b7d-93e76abb4757";
const userCallee = { id: user_id };

export default function StreamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] = React.useState<StreamVideoClient>();

  React.useEffect(() => {
    const myClient = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: userCallee,
      tokenProvider: createToken,
    });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, []);

  if (!client) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme>{children}</StreamTheme>
    </StreamVideo>
  );
}
