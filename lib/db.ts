'use server'
import { neon } from '@neondatabase/serverless';
import { error } from 'console';

export async function getDBConnection() {
  if(!process.env.NEONDB_URI){
    throw new Error("Neon Database URL is not defined")
  }
  const sql = neon(process.env.NEONDB_URI);
  return sql;
}