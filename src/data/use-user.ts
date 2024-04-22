import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";



const fetcher = async (...args) => {
  const token = localStorage.getItem("token")
  const [url] = args;
  console.log("dans fetcher:", token);


   const response = await fetch(url, {
     method: "GET",
     headers: {
       Authorization: "Bearer " + token,
     },
   });
console.log(response)
   if(response.ok){

     const data = await response.json()
     console.log("la réponse:", data)
     return data
   } else{
    // console.log(response.status)
    // const error = new Error("error while fetching data");
    // error.info = await response.json()
    // error.status = response.status
    // console.log(error)
    if(response.status === 403){
      console.log("statut de la réponse", response.status)
      const error = new Error("forbidden");
      error.status = response.status;
      throw error;
    }
   }


};


export default function useUser(id: string) {
  const { data, mutate, error } = useSWR(`/api/users/${id}`, (url) =>
    fetcher(url),
  );
  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
 
  console.log("au niveau de Useuser, statut de loading:",loading, "data : ", data,"et loggedOut : ", loggedOut)

  
  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
