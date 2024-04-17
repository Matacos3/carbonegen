import { LoginSchemaType } from "@/pages";
import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'better-sqlite3';
import * as jose from 'jose'

//adding my secret JWT key
const key = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = process.env.JWT_ALG 


export interface DataSub {
  id: number
  name: string
  value: number
  password: string
  email: string
}

type Data = {
  result: boolean
  data: DataSub

} | {
  error: string;
};

// Getting the right database
const dbPath = "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath); // Add any other options if needed

db.pragma('journal_mode = WAL');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.log("voilà la requête:", req.body);
    console.log("voilà ce qui est dans ta variable d’environnement : ", key, "et voilà l’algorithme : ", alg )
    const { email, password } = req.body;

    // Find the user with the given email and password
    const row = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password) as DataSub | undefined;
    console.log("résultat de la requête : ", row)
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    //generating token parameters

    const jwt = await new jose.SignJWT({ sub: row.id, email : row.email, name : row.name })
    .setProtectedHeader({ alg })
    .setIssuedAt() //sets issue date now
    .setExpirationTime("1w") //set expiration date 1 week from now
    .sign(key);

    console.log("et voilà le token :",jwt)
    // Map the row to the desired format (assuming each row has a 'name' property)
    const data = { result: true, data: row, token : jwt };

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from the database" });
  }
}

