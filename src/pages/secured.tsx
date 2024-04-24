import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "../data/use-user";

import Navbar from "../components/Navbar"
export default function securedPage() {
  //handling useUser

  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoiYWNvc3RhLmdhcmNpYS5tYXRlb0BnbWFpbC5jb20iLCJuYW1lIjoiTWF0ZW8gQWNvc3RhIiwiaWF0IjoxNzEzNDI2MDI1LCJleHAiOjE3MTQwMzA4MjV9.F02o1YX0lzptcG99N2rhOrO_N9IkROvta6B-rfCyOBE"

  const { user, loading, loggedOut, mutate } = useUser("1");
 

  //----------------------------------------------
  const router = useRouter();

  const [id, setId] = useState("")

  
  return (
    <>
     
 {/* test for another navbar */}


      <Navbar setId={(id)=>setId(id)}/>
      <div className="bg-color1 text-primary min-h-screen flex flex-col items-center justify-center p-8">
        <h1 className="text-center text-2xl mb-8">
          This is a secured page for connected users only
        </h1>
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <Link href="/fe">
            <button className="bg-color3 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-color2 transition duration-200 w-full">
              Voir des FE
            </button>
          </Link>
          <Link href="/fe/feOnDb">
            <button className="bg-color4 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-color2 transition duration-200 w-full">
              FE sur les bases de données
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
