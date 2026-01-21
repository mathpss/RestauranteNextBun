'use server'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega"
import { postgres } from "../Database/db"


export async function CriarPedidoEntraga(pedidoEntrega: Omit<PedidoEntrega, "Id">) {
    const reserved = await postgres.reserve()

    try {
        await reserved.begin(async sql => {
            const [entregaID]: PedidoEntrega[] = await sql`
            INSERT INTO ${sql("PedidoEntregas")} ("Nome", "Telefone", "Cidade", "Bairro", "NomeRua", "NumeroRua", "Date")
            VALUES (${pedidoEntrega.nome}, ${pedidoEntrega.telefone}, ${pedidoEntrega.cidade}, ${pedidoEntrega.bairro}, ${pedidoEntrega.nomeRua}, ${pedidoEntrega.numeroRua}, now())
            RETURNING *
            `
            const pedidosFormatado = pedidoEntrega.pedidos.map(item =>  ({
                "PedidoEntregaId": entregaID.Id,
                "Valor": item.valor,
                "Tamanho": item.tamanho,
                "Mistura": sql.array(item.mistura, 'TEXT'),
                "Guarnicao": sql.array(item.guarnicao, 'TEXT')
                
            }))
            await sql`
                INSERT INTO ${sql("Pedidos")} 
                ${sql(pedidosFormatado, "Valor", "Tamanho", "Mistura", "Guarnicao", "PedidoEntregaId" )}
            `

        })

    }
    catch (error) {
        console.error("Erro na inserção, transação não convertida ", error)
    }
    finally {
        reserved.release()
    }
    
}

export async function ListaPedidoEntrega() {
    const reserved = await postgres.reserve()

    try {
        const result:PedidoEntrega[] = await reserved.begin(async sql => {
            return await sql`SELECT
            pe.*,
            p.*
            FROM ${sql("PedidoEntregas")} pe
            JOIN ${sql("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            `
        })
        return result
    }
    finally {
        reserved.release()
    }

}