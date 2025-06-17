import { FileText } from "lucide-react";
import SummaryViewer from "./SummaryViewer";

export default function SummaryBody({summary}: {
  summary : Object
}) {
  return (
    <div className="relative mt-4 sm:mt-8 lg:mt-16 w-[80vw]">
      <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto">
        {/* Background gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

        {/* Floating word count badge */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
          <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
          {summary?.word_count?.toLocaleString()} words
        </div>

        {/* Summary viewer */}
        <div className="relative mt-8 sm:mt-6 flex justify-center">
          <SummaryViewer summary={summary} />
        </div>
      </div>
    </div>
  );
}
