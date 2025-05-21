import React from "react";
import { FileText, BrainCircuit, FileOutput, ArrowRight } from "lucide-react";

const content = [
  {
    icon: FileText,
    title: "Upload PDF",
    desc: "Simply drag and drop your PDF document or click to upload",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis ✨",
    desc: "Our advanced AI processes and analyzes your document instantly",
  },
  {
    icon: FileOutput,
    title: "Get Summary",
    desc: "Receive a clear, concise summary of your document",
  },
];

function HowItWorksSection() {
  return (
    <div className="p-20 flex flex-col justify-center items-center max-w-[90vw]">
      <div className="text-center flex flex-col gap-4 max-w-xl">
        <p className="font-bold text-xl uppercase text-rose-500">
          How it works
        </p>
        <p className="font-bold text-3xl">
          Transform any PDF into an easy-to-digest summary in three simple steps
        </p>
      </div>

      <div className="mt-10 p-2 grid md:grid-cols-3 grid-cols-1 gap-10 ">
        {
          content.map((c, idx)=>{
            return(
              <div key={idx} className="flex items-center">
                <div className="text-center hover:border px-2 py-4 hover:border-rose-600 rounded-2xl transform transition duration-200 ease-in-out border-gray-100 border ">
                  <div className="flex justify-center"><c.icon className="text-rose-600 border p-2 bg-gradient-to-br from-rose-100 to-white rounded-2xl" size={80}/></div>
                  <div className="text-xl font-bold my-2">{c.title}</div>
                  <div className="text-gray-600">{c.desc}</div>
                </div>
                  { idx!==2 &&
                   <ArrowRight className="hidden md:inline-flex text-rose-600" size={50}/>}
              </div>
            )
          })

        }
      </div>
    </div>
  );
}

export default HowItWorksSection;
