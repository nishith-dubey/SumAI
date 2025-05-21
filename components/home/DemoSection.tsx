import React from "react";
import { ShipWheel } from "lucide-react";

function DemoSection() {
  return (
    <section className="max-w-[90vw] flex justify-center mt-44 pb-20">
      <div className="flex flex-col items-center max-w-2xl text-center">
        <div className="border border-rose-600 text-rose-600 rounded-full p-2 inline-block m-4">
          <ShipWheel />
        </div>
        <h3 className="font-bold text-3xl">
          Watch how Sommaire transforms <span className="bg-clip-text text-transparent bg-linear-to-r from-rose-600 via-rose-700 to-rose-800">this OOPs course PDF</span> into an
          easy-to-read summary!
        </h3>
      </div>

      <div>

      </div>
    </section>
  );
}

export default DemoSection;
