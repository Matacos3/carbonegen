//importing all components
import Navbar from "../../components/Navbar";
import BddFe from "@/components/BddFe";

import { useState } from "react";
//importing zod for validation form
import * as z from "zod";
//import useForm from react
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//importing SWR
import useSWR from "swr";

//declaring zod schema

export const newFeSchema = z
  .object({
    name: z.string().min(1, "Merci d’entrer le nom du produit "),
    value: z.coerce
      .number({ invalid_type_error: "Merci de rentrer un nombre" })
      .positive("Merci de rentrer un nombre positif"),
    unit: z.enum(["kg", "m2", "kWh", "km","l"]),
  })
  .required();

//export schema
export type newFeSchemaType = z.infer<typeof newFeSchema>;

//fetcher function 

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function feOnDbPage() {
  //setting states
  //showing modal or not
  const [showModal, setShowModal] = useState(false);
//id value from navbar

const [id, setId] = useState("")
  //handling adding a FE in DB

  const addFe = (data: newFeSchemaType) => {
    console.log("we are adding FE");
    console.log("données passées par le formulaire",data);
    console.log("et voici l’id de user:", id)
    fetch("/api/fe/addFe",
      {
        method : "POST",
        headers : {"Content-Type":"application/json"},
        body : JSON.stringify({...data, author : id} )
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("résultat de la requête: ",data);
        if (data) {
          setShowModal(false);
          mutate()
        }
      });
  };

  //using useForm

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newFeSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(newFeSchema),
  });

  //watching all values
  console.log(watch("name"));
  console.log(watch("value"));

  //using SWR to get the data

const { data, error, isLoading, mutate} = useSWR("/api/fe/getAllFeBdd", fetcher)
console.log(data)
  //coding modal

  const modal = (
    <div className="absolute top-1/2 left-1/2 bg-color3 h-64 w-96 -translate-x-1/2 -translate-y-1/2 rounded text-color2 flex flex-col justify-center items-center">
      <div
        onClick={() => setShowModal(false)}
        className=" p-2 cursor-pointer text-color2 absolute top-0 right-0 hover:text-color3"
      >
        Close
      </div>
      <h3 className="text-color2">Ajoutez un fe ici</h3>
      <form
        onSubmit={handleSubmit(addFe)}
        className="text-color2 flex flex-col items-center justify-center w-full"
      >
        <label className="text-white" htmlFor="name">
          Nom du produit
        </label>
        <input
          {...register("name")}
          className="border-black m-0.5 w-1/2 text-color1"
        ></input>
        <span className="text-color4 h-4">
          {errors.name && errors.name.message}
        </span>
        <label className="text-white" htmlFor="value">
          Quantité émise (en Kg)
        </label>
        <input
          type="number"
          {...register("value")}
          className="border-black m-0.5 w-1/2 text-color1"
        ></input>
        <span className="text-color4 h-4">
          {errors.value && errors.value.message}
        </span>

        {/* reference unit */}
        <label className="text-white" htmlFor="unit">
          Unité de référence
        </label>
        <select
          {...register("unit")}
          className="border-black m-0.5 w-1/2 text-color1"
        >
          <option value="">Choisir une unité de référence</option>
          <option value="kg">kg</option>
          <option value="m2">m2</option>
          <option value="kWh">kWh</option>
          <option value="km">km</option>
          <option value="l">l</option>
        </select>

        <button
          type="submit"
          className="bg-color1 text-color3 p-2 rounded transition-all hover:bg-color2"
        >
          Ajouter le FE
        </button>
      </form>
    </div>
  );

  return (
    <div className="h-screen relative ">
      <Navbar setId={(id)=>setId(id)}/>
      {showModal && modal}
      <div className="flex items-center justify-center flex-col">
        <h1>Base de données facteurs d’émissions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-color1 text-color3 p-2 rounded transition-all hover:bg-color2"
        >
          Ajoutez un FE dans la base de données
        </button>
        <div className=" w-4/5">
          {data &&
          data.data.map(infos=>{
            return(
              <BddFe {...infos} mutate={()=>mutate()}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}
