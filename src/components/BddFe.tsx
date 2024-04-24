export default function BddFe({ name, value, unit, creationDate }) {

  return (
    <div>
      <h3>{name}</h3>
      <p>{value} kg de CO2e par {unit}</p>
      <p>Ajouté le {creationDate}</p>
    </div>
  );
}
