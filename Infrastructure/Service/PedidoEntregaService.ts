'use server'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega"
import { postgresSQL } from "../Database/db"

export async function CriarPedidoEntraga(pedidoEntrega: Omit<PedidoEntrega, "Id">) {
    const reserved = await postgresSQL.reserve()

    try {
        const [entregaID]: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            INSERT INTO ${reserved("PedidoEntregas")} ("Nome", "Telefone", "Cidade", "Bairro", "NomeRua", "NumeroRua", "Date")
            VALUES (${pedidoEntrega.nome}, ${pedidoEntrega.telefone}, ${pedidoEntrega.cidade}, ${pedidoEntrega.bairro}, ${pedidoEntrega.nomeRua}, ${pedidoEntrega.numeroRua}, now())
            RETURNING *
            `
        const pedidosFormatado = pedidoEntrega.pedidos.map(item => ({
            "PedidoEntregaId": entregaID.Id,
            "Valor": item.valor,
            "Tamanho": item.tamanho,
            "Mistura": reserved.array(item.mistura),
            "Guarnicao": reserved.array(item.guarnicao)
        }))
        await reserved`
                INSERT INTO ${reserved("Pedidos")} 
                ${reserved(pedidosFormatado, "Valor", "Tamanho", "Mistura", "Guarnicao", "PedidoEntregaId")}
            `



    }
    catch (error) {
        console.error("Erro na inserção, transação não convertida ", error)
    }
    finally {
        reserved.release()
    }

}

export async function ListaPedidoEntrega() {
    const reserved = await postgresSQL.reserve()

    try {
        const result: PedidoEntrega[] = await reserved<PedidoEntrega[]>`SELECT
            pe.*,
            p.*
            FROM ${reserved("PedidoEntregas")} pe
            JOIN ${reserved("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            `
        return result
    }
    finally {
        reserved.release()
    }

}