import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "better-sqlite3";
import * as jose from "jose";
import { parse } from "path";

//setting path to database
const dbPath =
  "/Users/mateo.acosta-garcia@carbone4.com/Desktop/Test de bdd/BDD Carbonegen.sqlite3";
const db = new sqlite3(dbPath);

db.pragma("journal_mode = WAL");

//function to get the current user

async function getCurrentuser(token: string | undefined) {
  //getting secretkey
  const key = new TextEncoder().encode(process.env.JWT_SECRET);
  if (!token) return null;
  //parsing token, and verifying it with payload
  const parsedToken = token.slice(7);
  const payload = await jose.jwtVerify(parsedToken, key);
  if (!payload) {
    return null;
  }
  return payload;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id;
  const token = req.headers.authorization;
  const currentUser = await getCurrentuser(token);
  if(!currentUser){
    return res.status(401).json({type:"unauthenticated", redirect : "/"})
  }
  //means you are connected
  console.log(id);
  console.log("données sur current user:", currentUser)
  return res.status(200).json({connected : true, userData : currentUser})
 
}
