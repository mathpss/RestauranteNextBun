'use server'
import postgres from 'postgres'

export const postgresSQL =  postgres(process.env.CONNECTION_STRING as string, {idle_timeout:30} )