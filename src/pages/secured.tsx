import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/user"
import Link from "next/link"

export default function securedPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfos = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!userInfos.isConnected) {
      router.push('/');
    }
  }, [userInfos.isConnected, router]);

  const handleDeconnection = () => {
    dispatch(logout());
  };
  return (
    <>
      {/* this must appear as a navbar in the page */}
      <nav className="fixed top-0 left-0 w-full px-6 py-4 bg-color2 shadow-md z-10">
        <div className="flex items-center justify-between">
          <img src="c4logo.png"></img>
          <div className="text-lg font-semibold">Welcome to my app</div>

          {userInfos.isConnected &&
            <Link href="user/me">
              <div className="text-white hover:text-color2">Connected as: {userInfos.mail}</div>
            </Link>
          }

          {userInfos.isConnected && <button className="bg-color4 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-color2 transition duration-200" onClick={() => handleDeconnection()}>Se déconnecter</button>}

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
