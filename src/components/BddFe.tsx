import moment from "moment";

export default function BddFe({ name, value, unit, creationDate }) {
  return (
    <div className="flex text-color2 p-2 my-1 border-1 border-color2 bg-color1 rounded">
      <div className="w-1/3 text-center">
        <h3 className="text-white">{name}</h3>
      </div>
      <div className = "w-1/3 text-center">
        <p className="text-color2">
          {value} kg de CO2e par {unit}
        </p>
      </div>
      <div className = "w-1/3 text-center">
        <p className="text-color2">Ajouté le {moment(creationDate).format("L")}</p>
      </div>
    </div>
  );
}
