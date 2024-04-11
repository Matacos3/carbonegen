import React, { useState } from 'react';
import Link from 'next/link';
import * as z from "zod";
import {useForm} from "react-hook-form";


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
//handling form

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm()

console.log(watch("email"))
console.log(watch("password"))
//logging when data is submitted

const onSubmit = (data, event) =>{
  event.preventDefault()
  console.log(data)
}
  //declaring zod schema
  const loginSchema = z.object({
    email: z.string().email("Veuillez saisir une adresse e-mail valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(128, "Le mot de passe ne doit pas dépasser 128 caractères"),
  });

  //handling the typing of schema


  
  //handdling submission

  return (
    <div className="h-screen flex flex-col items-center justify-center relative z-0">
      <div className="z-10">
        <h1 className="flex justify-center ">Bienvenue sur mon application</h1>
        <div className="flex">
          <Link href="/fe">
            <button className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 mx-6">
              Fe avec api
            </button>
          </Link>
          <button
            onClick={handleOpenModal}
            className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 mx-6"
          >
            Fe avec Base de données
          </button>
        </div>
      </div>

      {/* Modale de connexion */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Connexion</h2>
            <form onSubmit={(event)=>handleSubmit(onSubmit)(event)}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  {...register("password",{required : true})}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
                {errors.password && <span className="text-color4">This field is of course required</span>}
              </div>
              <button
                type="submit"
                className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 w-full"
              >
                Se connecter
              </button>
            </form>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Fermer
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}