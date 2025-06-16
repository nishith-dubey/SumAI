"use server";
import BGGradient from "@/components/common/bg-gradient";
import { ArrowUpRight, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DeleteSummary from "@/components/summary-components/DeleteSummary";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user?.id) redirect("/sign-in");

  const uploadLimit = 5;
  const summaries = await getSummaries(user?.id);
  // const summaries = [];
  return (
    <main className="min-h-screen mb-10">
      <BGGradient className="absolute from-emerald-500 via-teal-500 to-cyan-500 opacity-15" />
      <div className="w-[95%] sm:w-[85%] mx-auto flex flex-col gap-2 mt-10">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="sm:text-4xl text-3xl font-bold">Your Summaries</p>
            <p className="sm:text-[16px] text-sm text-gray-700">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>
          <Link href={"/upload"}>
            <button className="bg-rose-500 text-white font-semibold hover:bg-rose-600 duration-200 transform transition-all ease-in-out flex rounded-lg gap-2 items-center justify-around px-2 sm:px-4 py-2 text-sm sm:text-[16px]">
              <Plus />
              New Summary
            </button>
          </Link>
        </div>

        <div className="mt-6">
          <div className="bg-rose-50 border-rose-200 border text-rose-800 px-2 mx-auto sm:px-4 py-3 text-sm rounded-xl">
            <p className="text-sm">
              You've reached the limit of {uploadLimit} uploads on the Basic
              plan.{" "}
              <Link href={"/pro"} className="font-semibold sm:mx-2">
                <span className="border-b-2">
                  Click here to upgrade to Pro{" "}
                </span>
                <ArrowUpRight className="inline" size={20} />
              </Link>
              for unlimited uploads
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {summaries.length === 0 ? (
            <div className="md:w-[84vw] flex justify-center items-center flex-col mt-5 gap-2">
              <div className="text-xl text-black">No summaries yet!!</div>
              <div className="text-[16px] text-slate-700">
                Upload PDF to generate your first summary.
              </div>
              <Link href={"/upload"}>
                <button className="bg-rose-500 text-white font-semibold hover:bg-rose-600 duration-200 transform transition-all ease-in-out flex rounded-lg gap-2 items-center justify-around px-2 sm:px-4 py-2 text-sm sm:text-[16px] mt-4">
                  Upload PDF
                </button>
              </Link>
            </div>
          ) : (
            summaries.map((summary, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-rose-100 p-2 rounded-lg">
                        <FileText className="text-rose-600" size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {summary.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {new Date(summary.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                      {summary.summary_text}
                    </p>

                    <div className="flex justify-between items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          summary.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {summary.status.charAt(0).toUpperCase() +
                          summary.status.slice(1)}
                      </span>

                      <div className="flex gap-4 justify-center items-center">
                      <DeleteSummary summaryId={summary.id} />
                      <Link
                        href={`/summaries/${summary.id}`}
                        className="text-rose-600 hover:text-rose-800 text-sm font-medium flex items-center bg-transparent"
                      >
                        View
                        <ArrowUpRight className="ml-1" size={16} />
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
