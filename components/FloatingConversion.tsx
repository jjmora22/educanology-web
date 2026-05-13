import { CalendarDays } from "lucide-react";
import EducanologyAgent from "@/components/EducanologyAgent";

export default function FloatingConversion() {
  return (
    <>
      <a
        href="mailto:hello@educanology.eu?subject=Reuni%C3%A3o%20de%2045%20minutos%20com%20Educanology"
        className="fixed bottom-6 right-5 z-[2147483647] hidden items-center gap-3 rounded-full bg-[#17202a] px-5 py-4 text-sm font-bold text-white shadow-2xl shadow-slate-900/25 transition hover:bg-[#6f3e5c] md:flex"
      >
        <CalendarDays className="h-5 w-5" />
        Reunião de 45 min
      </a>

      <EducanologyAgent />
    </>
  );
}
