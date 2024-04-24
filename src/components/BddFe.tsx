import moment from "moment";

//importing icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCheck } from "@fortawesome/free-solid-svg-icons";

//importing stateHandling
import { useState } from "react";

//importing useForm
import { useForm } from "react-hook-form";
import { newFeSchema, newFeSchemaType } from "@/pages/fe/feOnDb";

//importing zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function BddFe({ name, value, unit, creationDate, id, mutate }) {
  const [isBeingChanged, setIsBeingChanged] = useState(false);



  //handling form states and submissions

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newFeSchemaType>({
    defaultValues: {
      name: name,
      value: value,
      unit: unit,
    },
    mode: "onSubmit",
    resolver: zodResolver(newFeSchema),
  });

  //const for submit

  const onSubmit = (data) => {
    console.log("submit");
    console.log("id du produit :", id)
    setIsBeingChanged(false);
    fetch("/api/fe/updateFe",{
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({...data, id : id})
    })
    .then(response => response.json())
    .then(finalRes =>{
      console.log("résultat de la requête:", finalRes)
      if(finalRes.changes > 0){
        mutate();
      }
    })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  p-2 my-1 border-1 border-color2 bg-color3 rounded items-center h-10"
    >
      <div className="w-1/3 text-center">
        {!isBeingChanged ? (
          <h3 className="text-white">{name}</h3>
        ) : (
          <input
            {...register("name")}
            className={`rounded text-color3 p-1 ${errors.name && " border-2 border-red-400"}`}
          ></input>
        )}
      </div>
      <div className="w-1/3 text-center">
        <p className="text-color2">
          {isBeingChanged ? (
            <input
              {...register("value")}
              type="number"
              className={`rounded text-color3 p-1 w-12 ${errors.value && " border-2 border-red-400"}`}
            ></input>
          ) : (
            value
          )}{" "}
          kg de CO2e par{" "}
          {isBeingChanged ? (
            <select
              {...register("unit")}
              className="rounded text-color3 p-1 w-14"
            >
              <option value="kg">kg</option>
              <option value="m2">m2</option>
              <option value="kWh">kWh</option>
              <option value="km">km</option>
              <option value="l">l</option>
            </select>
          ) : (
            unit
          )}
        </p>
      </div>
      <div className="w-1/3 text-center">
        <p className="text-color2">
          Ajouté le {moment(creationDate).format("L")}
        </p>
      </div>
      <span className=" cursor-pointer ">
        {!isBeingChanged ? (
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => setIsBeingChanged(true)}
          />
        ) : (
          <button type ="submit">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </span>
    </form>
  );
}
