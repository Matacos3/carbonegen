import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "better-sqlite3";
import * as jose from "jose";

//setting path to database
const dbPath =
  "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath);

db.pragma("journal_mode = WAL");

//function to get the current user

async function getCurrentUser(token: string | undefined) {
  try {
    // getting secret key
    const key = new TextEncoder().encode(process.env.JWT_SECRET);
    if (!token) return null;
    // parsing token and verifying it with payload
    const parsedToken = token.slice(7);
    const payload = await jose.jwtVerify(parsedToken, key);
    if (!payload) {
      return null;
    }
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id;
  const token = req.headers.authorization;
  const currentUser = await getCurrentUser(token);
  if (!currentUser) {
    console.log("il y a une erreur")
    return res.status(403).json({ type: "unauthenticated", redirect: "/" });
  }
  // means you are connected
  console.log(id);
  console.log("données sur current user:", currentUser);
  return res.status(200).json({ connected: true, userData: currentUser });
}
