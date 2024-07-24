"use client";
import React from "react";
import { createCall } from "./_actions/createCall";

import { Button } from "@/components/ui/button";
import IncomingCallAlert from "./_components/incoming-call-alert";

const page = () => {
  return (
    <div className="min-h-screen flex gap-6 justify-center items-center">
      <IncomingCallAlert />
      <Button onClick={() => createCall()}>Create call</Button>
    </div>
  );
};

export default page;
