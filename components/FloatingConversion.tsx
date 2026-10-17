import { CalendarDays } from "lucide-react";
import EducanologyAgent from "@/components/EducanologyAgent";
import MeetingRequestButton from "@/components/MeetingRequestButton";

export default function FloatingConversion() {
  return (
    <>
      <MeetingRequestButton
        className="fixed bottom-6 right-5 z-[2147483647] hidden items-center gap-3 rounded-full bg-[#17202a] px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-slate-900/25 transition hover:bg-[#6f3e5c] md:flex"
      >
        <CalendarDays className="h-5 w-5" aria-hidden="true" />
        Reunião de 45 min
      </MeetingRequestButton>

      <EducanologyAgent />
    </>
  );
}
