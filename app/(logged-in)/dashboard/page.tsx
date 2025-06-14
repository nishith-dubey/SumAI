'use client'
import BGGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
// import { Dialog } from "@/components/ui/dialog";
import {
  ArrowUpRight,
  BookCopy,
  FileText,
  NotepadText,
  Plus,
  Text,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function Dashboard() {
  //for cancel button
  const [open ,setOpen] = useState(false);

  const uploadLimit = 5;
  const summaries = [
    {
      id: 1,
      title: "The Leader's Playbook: The First 90 Days",
      created_at: "2025-01-30",
      summary_text:
        "Ace your first 90 days as a leader with this actionable guide.",
      status: "completed",
    },
    {
      id: 2,
      title: "Sous Sol Bar Menu",
      created_at: "2025-01-30",
      summary_text:
        "The ultimate guide to our menu options with exquisite drinks and spirits.",
      status: "completed",
    },
    {
      id: 3,
      title: "Project Orion Kickoff",
      created_at: "2025-02-15",
      summary_text: "Initial planning document for Q2 product launch.",
      status: "not",
    },
    {
      id: 4,
      title: "Annual Financial Report",
      created_at: "2025-03-10",
      summary_text: "Key insights from last fiscal year's performance.",
      status: "completed",
    },
  ];

  return (
    <main className="min-h-screen mb-10">
      <BGGradient className="absolute" />
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
          {summaries.map((summary, idx) => {
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
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild className="text-gray-600 bg-gray-200 rounded-full">
                          <Trash2 className="p-1" size={24} />
                        </DialogTrigger>
                        <DialogContent className="bg-white border-none flex justify-center items-center">
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                              <div className="flex gap-4 pt-4 text-center">
                                <Button className="bg-gray-200 text-black hover:bg-gray-300" onClick={() => setOpen(false)}>Cancel</Button>
                                <Button className="bg-red-500 hover:bg-red-600">Delete</Button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      <button className="text-rose-600 hover:text-rose-800 text-sm font-medium flex items-center bg-transparent">
                        View
                        <ArrowUpRight className="ml-1" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
