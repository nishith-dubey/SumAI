import BGGradient from "@/components/common/bg-gradient";
import SummaryHeader from "@/components/summary-components/SummaryHeader";
import { getSummaryById } from "@/lib/summaries";
import Custom404 from "@/components/ui/Custom404"

export default async function SummaryPage(props : {
  params: Promise<{id : string}>
}) {
  const params = await props.params;
  const id = params.id;

  const summary = await getSummaryById(id);

  if(!summary) {
    return <Custom404 />
  }

  return (
    <div className="px-10">
      <BGGradient className="from-rose-300 via-rose-200 to-orange-200 opacity-30"/>
      <SummaryHeader/>
    </div>
  )
}