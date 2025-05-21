import React from "react";
import { SparklesIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="flex justify-center">
      <div className="items-center flex flex-col gap-6 mt-20 max-w-[90vw]">
        <div className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-rose-100 via-rose-500 to-rose-800 animate-gradient-x border-rose-100">
          <div className="rounded-full bg-white dark:bg-black px-4 py-2 flex gap-2 items-center text-rose-600">
            <SparklesIcon className="animate-pulse" />
            Powered by AI
          </div>
        </div>

        <h1 className="text-center">
          Transform PDFs into {""}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">concise</span>
            <span className="bg-rose-200/50 absolute inset-0 -rotate-2 rounded-lg -skew-y-1 transform"></span>
          </span>{" "}
          summaries
        </h1>
        <p className="text-gray-600 text-center text-2xl font-semibold">
          Get a beautiful summary reel of the document in seconds.
        </p>
        <button className="px-8 md:px-12 md:mt-10 text-2xl text-white py-2 md:py-3 rounded-full bg-gradient-to-r from-slate-900 to-rose-600 flex gap-4 items-center justify-center font-semibold tracking-tight transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-l">
          Try SumAI
          <ArrowRight className="w-5 animate-pulse" />
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
