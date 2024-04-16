import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'better-sqlite3'


//setting path to database
const dbPath = "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath);

db.pragma('journal_mode = WAL');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.feId
  // const token = req.headers.authorization
  console.log(id)
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.status(200).json(data.results[0])
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}