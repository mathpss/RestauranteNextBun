'use server'
import { SQL } from "bun"


export const postgres = new SQL(Bun.env.CONNECTION_STRING as string, {idleTimeout: 30} )