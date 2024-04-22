
import { useEffect, useState } from "react"
import useSWR from "swr"
import Fe from "../components/Fe"
import { feResponses } from "./api/fetch_data"
import Navbar from "@/components/Navbar"

export default function fe() {

  //declaring state of pagination

  const [pageStart, setPageStart] = useState(1)
  const [incrementedData, setIncrementedData] = useState<feResponses>([])
  const [counter, setCounter] = useState(0)
  //declaring fetch function
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  //fetching data
  const { data, error, isLoading } = useSWR<feResponses>(`/api/fetch_data?position=${pageStart}`, fetcher)

  //function to display more datas
  const displayFes = () => {
    setPageStart(pageStart + 1)
    console.log(incrementedData)
  }
  //useEffect pour gérer l’incrémentation de data 

  useEffect(() => {
    if (data) {
      console.log("Use effect");
      
      setIncrementedData([...incrementedData, ...data]);
    }
  }, [data]);


  

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div>
      <Navbar />
      <div >
        <h1 className="text-center">Base Facteurs d’Émission</h1>
      </div>
      <button onClick={()=> setCounter((prev)=> prev + 1)}>click click click {counter}</button>
      <div className="flex flex-wrap mx-10">
        {isLoading && <div>Loading...</div>}
        {incrementedData?.map(dataItem =>
          <Fe name={dataItem.Nom_base_anglais ? dataItem.Nom_base_anglais : dataItem.Nom_base_français} emitted={dataItem.Total_poste_non_décomposé} unit={dataItem.Unité_anglais} source={dataItem.Source ? dataItem.Source : "Source inconnue"} id={Number(dataItem['Identifiant_de_l\'élément'])} />
        )}
      </div>
      <div className="w-fit mx-auto my-2">
        <button onClick={() => displayFes()} className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200">
          Cliquez pour montrer plus de facteurs d’émissions !
        </button>
      </div>
    </div>
  )
}
