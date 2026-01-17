'use server'
import { Cardapio } from "@/Domain/Model/Cardapio"
import { postgres } from "../Database/db"

export async function CardapioServiceGet(): Promise<Cardapio>{
    
    const reserved = await postgres.reserve()
    
    try {
       const [result]: Cardapio[] = await reserved.begin(async sql => {
        return await sql`SELECT * FROM ${postgres("Cardapios")}`
       })
        
       return result
    } finally {
        reserved.release()
    }
    
}
// const [result]: Cardapio[] = await postgres.begin(async sql => {

//     return await sql`SELECT * FROM ${postgres("Cardapios")}`

// })