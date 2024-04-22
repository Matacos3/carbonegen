import Navbar from "../../components/Navbar";
import { useState } from "react";
export default function feOnDbPage() {
  //setting states
  //showing modal or not
  const [showModal, setShowModal] = useState(false);

  //handling adding a FE in DB

  const addFe = () => {
    console.log("we are adding FE");
  };

  //coding modal

  const modal = (
    <div className="absolute top-1/2 left-1/2 bg-color1 h-52 w-96 -translate-x-1/2 -translate-y-1/2 rounded text-color2 flex flex-col justify-center items-center">
      <div
        onClick={() => setShowModal(false)}
        className=" p-2 cursor-pointer text-color2 absolute top-0 right-0 hover:text-color3"
      >
        Close
      </div>
      <h3 className="text-color2">Ajoutez un fe ici</h3>
      <form></form>
    </div>
  );

  return (
    <div className="h-screen relative ">
      <Navbar />
      {showModal && modal}
      <div className="flex items-center justify-center flex-col">
        <h1>Base de données facteurs d’émissions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-color1 text-color3 p-2 rounded transition-all hover:bg-color2"
        >
          Ajoutez un FE dans la base de données
        </button>
        <div className="bg-color1 w-4/5"></div>
      </div>
    </div>
  );
}
