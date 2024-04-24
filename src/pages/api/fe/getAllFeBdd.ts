import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "better-sqlite3";

const dbPath =
  "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath)
db.pragma("journal_mode = WAL");


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("requesting route for fetching the FE");
    const allFe = db.prepare("SELECT * FROM emissionFactors").all()
    if(!allFe){

      return res.status(400).json({error : "no data found"})
    }
    res.status(200).json({data : allFe})
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
}
