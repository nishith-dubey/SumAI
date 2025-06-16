import { SparklesIcon } from "lucide-react";

export default function SummaryHeader() {
  return (
    <section>
      <div className="flex gap-4">
        <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100">
          <div className="rounded-full bg-white dark:bg-black px-4 py-2 flex gap-2 items-center text-rose-600">
            <SparklesIcon className="animate-pulse" />
            AI Summary
          </div>
        </div>
        <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100">
          <div className="rounded-full bg-white dark:bg-black px-4 py-2 flex gap-2 items-center text-rose-600">
            <SparklesIcon className="animate-pulse" />
            AI Summary
          </div>
        </div>
        <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100">
          <div className="rounded-full bg-white dark:bg-black px-4 py-2 flex gap-2 items-center text-rose-600">
            <SparklesIcon className="animate-pulse" />
            AI Summary
          </div>
        </div>
      </div>

      <div>
        
      </div>
    </section>
  );
}
