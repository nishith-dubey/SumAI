import {
  ArrowLeft,
  ArrowRight,
  Calendar1Icon,
  ChevronLeft,
  Clock4,
  Download,
  FilePenLine,
  SparklesIcon,
  ViewIcon,
} from "lucide-react";
import Link from "next/link";

export default function SummaryHeader({
  title,
  summary_text,
  file_name,
}: {
  title: string;
  summary_text: string;
  file_name: string;
}) {
  return (
    <section className="flex flex-col gap-4 w-[90vw]">
      <div className="flex flex-row justify-between w-full items-start sm:items-center gap-4 sm:gap-0">
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {/* Badge 1 */}
          <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100 scale-90">
            <div className="rounded-full bg-white dark:bg-black px-2 md:px-4 py-1 md:py-2 flex gap-2 items-center text-rose-600 text-sm sm:text-base">
              <SparklesIcon className="animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
              AI Summary
            </div>
          </div>

          {/* Badge 2 */}
          <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-amber-100 via-amber-500 to-amber-800 animate-gradient-x border-amber-100 scale-90">
            <div className="rounded-full bg-white dark:bg-black px-2 md:px-4 py-1 md:py-2 flex gap-2 items-center text-amber-600 text-sm sm:text-base">
              <Calendar1Icon className="animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
              Date
            </div>
          </div>

          {/* Badge 3 */}
          <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-orange-100 via-orange-500 to-orange-800 animate-gradient-x border-orange-100 scale-90">
            <div className="rounded-full bg-white dark:bg-black px-2 md:px-4 py-1 md:py-2 flex gap-2 items-center text-orange-600 text-sm sm:text-base">
              <Clock4 className="animate-pulse w-4 h-4 sm:w-5 sm:h-5" />1 min
              read
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="w-auto">
          <button className="w-auto text-black py-2 px-4 rounded-full bg-gradient-to-r from-red-100 to-rose-200 flex gap-2 items-center justify-center font-semibold tracking-tight transform transition duration-300 ease-in-out hover:bg-gradient-to-l text-sm sm:text-base cursor-pointer scale-90">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span className="md:flex hidden">Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="">
        <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-700 text-transparent bg-clip-text">
          {title}
        </span>
      </div>

      <div className="flex md:flex-col gap-3 scale-90 text-[14px] md:text-[16px]">
        {file_name && (
          <div className="flex justify-center items-center">
            <FilePenLine className="mx-2 text-rose-600" />
            <span className="text-zinc-800">Source : {file_name}</span>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 ">
          <Link
            href={"/"}
            className="flex justify-center items-center px-2 py-[5px] rounded-lg bg-gray-100"
          >
            <ViewIcon className="mx-2 text-rose-600" size={20} />
            <span className="text-zinc-800">View Original</span>
          </Link>
          <Link
            href={"/"}
            className="flex justify-center items-center px-2 py-[5px] rounded-lg bg-rose-200"
          >
            <Download className="mx-2 text-rose-600" size={20} />
            <span className="text-zinc-800">Download Summary</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
