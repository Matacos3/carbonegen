import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "../data/use-user";

export default function securedPage() {
  //handling useUser
  const id = "1";
  const token = localStorage.getItem("token");
  console.log("ceci est le token :", token)

  const { user, loading, loggedOut, mutate } = useUser(id, token);
  console.log(user)
  console.log("informations sur user via SWR:", user)

  //----------------------------------------------
  const router = useRouter();


  const handleDeconnection = () =>{
    console.log("handle deconnection")
  }

  
  return (
    <>
      {/* this must appear as a navbar in the page */}
      <nav className="fixed top-0 left-0 w-full px-6 py-4 bg-color2 shadow-md z-10">
        <div className="flex items-center justify-between">
          <img src="c4logo.png"></img>
          <div className="text-lg font-semibold">Welcome to my app</div>

    
            <Link href="user/me">
              <div className="text-white hover:text-color2">
          
                Connected as : {user && user.userData.payload.email}
              </div>
            </Link>
          

  
            <button
              className="bg-color4 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-color2 transition duration-200"
              onClick={() => handleDeconnection()}
            >
              Se déconnecter
            </button>
    
        </div>
      </nav>
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
          <Link href="/">
            <button className="bg-color4 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-color2 transition duration-200 w-full">
              FE sur les bases de données
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
