import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useUser from "@/data/use-user";
import { useState, useEffect } from "react";

export default function Navbar(props) {
  const { user, loading, loggedOut, mutate } = useUser("1");
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (loggedOut) {
      console.log("the use effect is triggered because your are logged out");
      router.push("/");
    }
  }, [loggedOut]);

  const handleDeconnection = async () => {
    console.log("handle deconnection");
    localStorage.removeItem("token");
    mutate(null);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-color1 text-white flex justify-between items-center px-4 py-3">
        <div>
          <Image
            src="/c4logo.png"
            alt="Logo"
            width={30}
            height={40}
            layout="fixed"
          />
        </div>

        <div className="flex space-x-4">
          <Link href="/fe">
            <button className="text-white hover:text-gray-300">
              Facteurs d’émission à partir de l’API
            </button>
          </Link>
          <Link href="/fe/feOnDb">
            <button className="text-white hover:text-gray-300">
              Facteurs d’émission BDD
            </button>
          </Link>
        </div>
        <div className="relative">
          <button
            className="text-white hover:text-color2 focus:outline-none"
            onClick={handleToggleMenu}
          >
            {user ? user.userData.payload.email : "error"}
          </button>
          {menuOpen && (
            <div className="bg-white text-black absolute mt-2 py-2 px-4 rounded shadow-md">
              <Link href="/user/me">
                <div className="hover:bg-gray-200 px-2 py-1 rounded">
                  Change user infos
                </div>
              </Link>
              <div
                className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
                onClick={handleDeconnection}
              >
                Disconnect
              </div>
            </div>
          )}
        </div>
      </nav>
      
    </>
  );
}
