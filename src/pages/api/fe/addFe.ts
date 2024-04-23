import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "better-sqlite3";

const dbPath =
  "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";

const db = new sqlite3(dbPath); // Add any other options if needed
db.pragma("journal_mode = WAL");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(
      "requesting route for adding fe, with the following data :",
      req.body,
    );

    const { name, value, unit, author } = req.body;

  
    console.log(`name : ${name}, value : ${value}, unit : ${unit}`);

    const newFe = db
      .prepare(
        "INSERT INTO emissionFactors (name, value, unit, creationDate, author) VALUES (?, ?, ?, ?, ?)",
      )
      .run(name, value, unit, Date.now(), author);

    res
      .status(200)
      .json({ name: name, value: value, unit: unit, changes: newFe.changes });
  } catch {
    res.status(500).json({ error: "an error occurred" });
  }
}
