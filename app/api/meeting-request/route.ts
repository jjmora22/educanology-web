import { handleMeetingRequest } from "@/lib/meeting-request/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleMeetingRequest(request, {
    logError: (message) => console.error(message),
  });
}
