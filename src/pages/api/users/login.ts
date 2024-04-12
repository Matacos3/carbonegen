import { loginSchemaType } from "@/pages";
import type { NextApiRequest, NextApiResponse } from "next";
import { Database } from "bun:sqlite";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try{
    console.log("test")
  }catch(error){
    res.status(500).json({error:"an error occurred while fetching database"})
  }
}
