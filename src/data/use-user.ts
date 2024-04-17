import useSWR, { mutate } from "swr";


const fetcher = (...args) => {
  const [url, headerValue] = args;
  console.log("dansr fetcher:", headerValue);
  
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + headerValue
    }
  })
  .then(res => res.json())
  .catch(error => {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  });
}


export default function useUser (id : string, token : string | null) {
  const { data, mutate, error } = useSWR(`/api/users/${id}`, url => fetcher(url, token))

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  console.log("au niveau du useuser, les données:", data, "et voici l’id:", id, "et voici le token : ", token)
 
  return {
    loading,
    loggedOut, 
    user: data,
    mutate
  }
}