import type { NextApiRequest, NextApiResponse } from "next";
import type { ChangeSchemaType } from "@/pages/user/me";
import sqlite3 from 'better-sqlite3';
import * as jose from 'jose'


const dbPath = "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath); // Add any other options if needed
db.pragma('journal_mode = WAL');


//getting the key adn the algorithm to processa  new token
const key = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = process.env.JWT_ALG 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try{
    const id = "1";
    const { email, name } = req.body;
    console.log(id, email, name)
    console.log("vous êtes bienr dans la route edit/id")
    const row = db.prepare(`UPDATE users SET name = ?, email = ? WHERE id = ?`).run(name, email, id);
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }
    const jwt = await new jose.SignJWT({ sub: id, email : email, name : name})
    .setProtectedHeader({ alg })
    .setIssuedAt() //sets issue date now
    .setExpirationTime("1w") //set expiration date 1 week from now
    .sign(key);

    console.log("resultat de la requête :", row.changes)
    const data = {result : true, token : jwt, changedData : row}

    res.status(200).json(data);
  } catch(error){
    console.error(error)
    res.status(500).json({error:"an error occurred"})
  }
}
