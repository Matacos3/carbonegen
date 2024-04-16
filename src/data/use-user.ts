import useSWR from "swr";


const fetcher = (...args) => fetch(...args).then(res => res.json())



function useUser (id) {
  const { data, error, isLoading } = useSWR(`/api/users/${id}`, fetcher)
 
  return {
    user: data,
    isLoading,
    isError: error
  }
}