import Link from "next/link";

interface Props {
  source: string;
  name: string;
  emitted: number;
  unit: string;
  id : number
}

export default function Fe(props: Props) {
  return (
    <Link href={`/fe/${props.id}`}>
    <div className="bg-gray-100 shadow-lg p-6 rounded-lg my-4 mx-2 w-96 hover:scale-105 transition-all duration-500">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{props.name}</h2>
      <p className="text-base font-medium text-gray-700">
        {props.emitted} {props.unit}
      </p>
      <p className=" text-xs text-gray-500 mt-2">Source: {props.source}</p>
    </div>
    </Link>
  );
}