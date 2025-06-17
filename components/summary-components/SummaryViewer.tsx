
export default function SummaryViewer({summary}:{
  summary: object
}){
  return(
    <p>{summary?.summary_text}</p>
  )
}