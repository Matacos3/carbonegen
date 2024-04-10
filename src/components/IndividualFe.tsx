import { FeResponse } from "@/pages/api/fe/[feId]";
import useSWR from "swr";


export default function individualFe(props) {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error, isLoading } = useSWR<FeResponse>(`/api/fe/${props.id}`, fetcher)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data)
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{data.Nom_base_anglais}</h2>
  <p className="text-xl text-center text-gray-700 mb-4">{data.Total_poste_non_décomposé} {data.Unité_anglais}</p>
  <p className="text-gray-600 text-center">Source: {data.Source}</p>
</div>
  )
}