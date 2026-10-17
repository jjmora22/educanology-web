"use client";

import type { ButtonHTMLAttributes } from "react";
import { useMeetingRequest } from "@/components/MeetingRequestProvider";

type MeetingRequestButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
>;

export default function MeetingRequestButton({
  children,
  className = "",
  ...props
}: MeetingRequestButtonProps) {
  const { openMeetingRequest } = useMeetingRequest();

  return (
    <button
      type="button"
      className={`${className} cursor-pointer`}
      onClick={openMeetingRequest}
      {...props}
    >
      {children}
    </button>
  );
}
