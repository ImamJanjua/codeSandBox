"use client";
import React from "react";
import {
  useCalls,
  useCall,
  CallingState,
  StreamCall,
  SpeakerLayout,
  CallControls,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const calls = useCalls();
  const call = calls.find((call) => call.cid === params.id);

  if (!call) return null;

  return (
    <div>
      <StreamCall call={call} key={call.cid}>
        <Call />
        <p>{call.cid}</p>
      </StreamCall>
    </div>
  );
};

const Call = () => {
  const call = useCall();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  React.useEffect(() => {
    if (callingState === CallingState.RINGING) {
      console.log("Joining call...");
      call?.join();
    }
  }, []);

  return (
    <>
      <SpeakerLayout />
      <CallControls />
    </>
  );
};

export default page;
