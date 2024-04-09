
import { useEffect, useState } from "react"
import useSWR from "swr"
import Fe from "../components/fe"

export default function fe() {

  //declaring state of pagination

  const [pageStart, setPageStart] = useState(1)
  const [incrementedData, setIncrementedData] = useState([])
  //declaring fetch function
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  //fetching data
  const { data, error, isLoading } = useSWR(`/api/fetch_data?position=${pageStart}`, fetcher)

  //function to display more datas
  const displayFes = () => {
    setPageStart(pageStart + 1)
    console.log(incrementedData)
  }
//useEffect pour gérer l’incrémentation de data 

useEffect(() => {
  if (data) {
    setIncrementedData( [...incrementedData, ...data.results]);
  }
}, [data]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const dataToDisplay = incrementedData?.map(dataItem => {
    return (
      <Fe name={dataItem.Nom_base_anglais ? dataItem.Nom_base_anglais : dataItem.Nom_base_français} emitted={dataItem.Total_poste_non_décomposé} unit={dataItem.Unité_anglais} source={dataItem.Source ? dataItem.Source : "Source inconnue"} />
    )
  })

  return (
    <div>
      <div >

        <h1 className="text-center">Base Facteurs d’Émission</h1>
      </div>
      <div className="flex flex-wrap mx-10">
        {dataToDisplay}
      </div>
      <div className="w-fit mx-auto my-2">
        <button onClick={() => displayFes()} className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200">
          Cliquez pour montrer plus de facteurs d’émissions !
        </button>
      </div>
    </div>
  )
}