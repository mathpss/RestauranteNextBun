'use server'
import { Cardapio } from "@/Domain/Model/Cardapio"
import { postgresSQL } from "../Database/db"

export async function CardapioServiceGet(): Promise<Cardapio>{
    
    const reserved = await postgresSQL.reserve()
    
    try {
       const [result] = await reserved<Cardapio[]>`SELECT * FROM ${postgresSQL("Cardapios")}`
       
       return result
    } finally {
        reserved.release()
    }
    
}