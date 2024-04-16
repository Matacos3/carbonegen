import React, { FormEvent, useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Ajoutez cette ligne
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import { useRouter } from "next/router";

//declaring zod schema
const loginSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse e-mail valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(128, "Le mot de passe ne doit pas dépasser 128 caractères"),
});
//stating schema as type

export type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

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
  } = useForm<LoginSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  console.log(watch("email"));
  console.log(watch("password"));
  //logging when data is submitted

  const onSubmit = (data: LoginSchemaType) => {
    console.log("data to be sent:", data);
    //using SWR for connexion

    //using classic fetch for  connection
    fetch("/api/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data received:", data);
        if (data.result === true) {
          setAuthError(false);
          const token = data.data.token ? data.data.token : "thisIsAToken";
          const loginInfos = {
            mail: data.data.email,
            name: data.data.name,
            token: token,
          };
          console.log(loginInfos);
          dispatch(login(loginInfos));
          router.push("/secured");
        } else {
          setAuthError(true);
        }
      });
  };

  //handling the typing of schema

  //handdling submission

  return (
    <div className="h-screen flex flex-col items-center justify-center relative z-0">
      <div className="z-10">
        <h1 className="flex justify-center ">Bienvenue sur mon application</h1>
        <div className="flex">
          {/* <Link href="/fe">
            <button className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 mx-6">
              Fe avec api
            </button>
          </Link> */}
          <button
            onClick={handleOpenModal}
            className="bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 mx-6"
          >
            Se Connecter
          </button>
        </div>
      </div>

      {/* Modale de connexion */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Connexion</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
                {errors.email && (
                  <span className="text-color4">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
                {authError ? (
                  <span className="text-color4">
                    Mauvais mot de passe ou email
                  </span>
                ) : (
                  errors.password && (
                    <span className="text-color4">
                      {errors.password.message}
                    </span>
                  )
                )}
              </div>
              <button
                type="submit"
                className={`bg-color1 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-color2 transition duration-200 w-full`}
              >
                Se Connecter
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
