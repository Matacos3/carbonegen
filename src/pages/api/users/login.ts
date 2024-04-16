import { LoginSchemaType } from "@/pages";
import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from 'better-sqlite3';
import * as jose from 'jose'



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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.log("voilà la requête:", req.body);

    const { email, password } = req.body;

    // Find the user with the given email and password
    const row = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').get(email, password) as DataSub | undefined;
    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    // Map the row to the desired format (assuming each row has a 'name' property)
    const data = { result: true, data: row };

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data from the database" });
  }
}

