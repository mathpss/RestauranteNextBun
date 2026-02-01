'use server'
import { Cardapio } from "@/Domain/Model/Cardapio"
import { postgresSQL } from "../Database/db"

export async function CardapioServiceGet(): Promise<Cardapio> {

    const reserved = await postgresSQL.reserve()

    try {
        const [result] = await reserved<Cardapio[]>`SELECT * FROM ${postgresSQL("Cardapios")}`

        return result
    } finally {
        reserved.release()
    }

}

export async function CardapioServiceUpdate(cardapio: Cardapio) {
    const reserved = await postgresSQL.reserve()
    try {
        const result = await reserved`UPDATE ${reserved("Cardapios")} SET ${reserved(cardapio)} WHERE "Id" = 1`
        console.log("Saída do DB state",result)
    } catch (error) {
        console.error("Ops houve um erro: ", error)
    }
    finally {
        reserved.release()
    }
}