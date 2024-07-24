"use client";
import React from "react";
import Link from "next/link";
import { useCalls } from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const IncomingCallAlert = () => {
  const calls = useCalls();
  if (!calls || calls.length === 0) return null;

  console.log("IncomingCallAlert", calls);

  return (
    <div>
      <Alert variant="destructive" className="z-50 flex ">
        <div>
          <AlertTitle>Video Sprechstunde</AlertTitle>
        </div>

        <Link href={`/videocall/${calls[0].cid}`}>
          <Button variant="destructive" className="ml-auto">
            accept call
          </Button>
        </Link>
      </Alert>
    </div>
  );
};

export default IncomingCallAlert;
