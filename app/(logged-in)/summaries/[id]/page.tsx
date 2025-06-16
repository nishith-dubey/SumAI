import BGGradient from "@/components/common/bg-gradient";
import SummaryHeader from "@/components/summary-components/SummaryHeader";
import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import SummaryBody from "@/components/summary-components/SummaryBody";

export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name } = summary;

  return (
    <div className="flex flex-col items-center py-4 min-h-screen w-full">
      <div className="relative w-full">
        <BGGradient className="from-rose-500 via-amber-500 to-orange-500 opacity-10" />
      </div>
      <SummaryHeader
        title={title}
        summary_text={summary_text}
        file_name={file_name}
      />
      <SummaryBody summary={summary} />
    </div>
  );
}
