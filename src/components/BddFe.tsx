import moment from "moment";

//importing icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

//importing stateHandling
import { useState } from "react"

//importing useForm
import { useForm } from "react-hook-form";
import { newFeSchema, newFeSchemaType } from "@/pages/fe/feOnDb";

//importing zod
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; 

export default function BddFe({ name, value, unit, creationDate }) {
  const [isBeingChanged, setIsBeingChanged] = useState(false);

  const handleChange = () =>{
    console.log("pour changer")
    setIsBeingChanged(true);
  }

  //handling form states and submissions

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<newFeSchemaType>({
    defaultValues:{
      name : name,
      value : value,
      unit : unit
    },
    mode: "onBlur",
    resolver: zodResolver(newFeSchema),
  });

  return (
    <div className="flex  p-2 my-1 border-1 border-color2 bg-color3 rounded items-center h-10">
      <div className="w-1/3 text-center">
        {!isBeingChanged ? <h3 className="text-white">{name}</h3> :  <input {...register("name")} className="rounded text-color3 p-1"></input> }
        
      </div>
      <div className = "w-1/3 text-center">
        <p className="text-color2">
          {isBeingChanged ? <input {...register("value")} type="number" className="rounded text-color3 p-1 w-12"></input> : value} kg de CO2e par {isBeingChanged ? <select
          {...register("unit")}
          className="rounded text-color3 p-1 w-14"
        >
          <option value="kg">kg</option>
          <option value="m2">m2</option>
          <option value="kWh">kWh</option>
          <option value="km">km</option>
          <option value="l">l</option>
        </select> :unit}
        </p>
      </div>
      <div className = "w-1/3 text-center">
        <p className="text-color2">Ajouté le {moment(creationDate).format("L")}</p>
      </div>
      <span className=" cursor-pointer ">

      <FontAwesomeIcon icon={faPenToSquare} onClick={()=>setIsBeingChanged(!isBeingChanged)}/> {/* Change 'red' to the color you desire */}
      </span>
    </div>
  );
}
