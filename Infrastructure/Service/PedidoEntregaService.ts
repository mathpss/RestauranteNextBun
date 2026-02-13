'use server'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega"
import { postgresSQL } from "../Database/db"

export async function CriarPedidoEntraga(pedidoEntrega: Omit<PedidoEntrega, "Id" | "Date">) {
    const reserved = await postgresSQL.reserve()

    try {
        const [entregaID]: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            INSERT INTO ${reserved("PedidoEntregas")} ("Nome", "Telefone", "Cidade", "Bairro", "NomeRua", "NumeroRua", "Date")
            VALUES (${pedidoEntrega.Nome}, ${pedidoEntrega.Telefone}, ${pedidoEntrega.Cidade}, ${pedidoEntrega.Bairro}, ${pedidoEntrega.NomeRua}, ${pedidoEntrega.NumeroRua}, now())
            RETURNING *
            `
        const pedidosFormatado = pedidoEntrega.pedidos.map(item => ({
            "PedidoEntregaId": entregaID.Id,
            "Valor": item.Valor,
            "Tamanho": item.Tamanho,
            "Mistura": reserved.array(item.Mistura),
            "Guarnicao": reserved.array(item.Guarnicao)
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
export async function ListaPedidoEntregaHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            SELECT
            pe."Id",
            pe."Nome",
            pe."Telefone",
            pe."NomeRua",
            pe."NumeroRua",
            pe."Bairro",
            pe."Cidade",
            json_agg(p.*) as "pedidos"
            FROM ${reserved("PedidoEntregas")} pe
            JOIN ${reserved("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            WHERE pe."Date"::date = CURRENT_DATE
            GROUP BY 
            pe."Id", 
            pe."Nome", 
            pe."Telefone", 
            pe."NomeRua", 
            pe."NumeroRua", 
            pe."Bairro", 
            pe."Cidade";
            `
        return result
    }
    finally {
        reserved.release()
    }

}

export async function PedidoEntregaNovosHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            SELECT
            pe.*,
            json_agg(p.*) as "pedidos"
            FROM ${reserved("PedidoEntregas")} pe
            JOIN ${reserved("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            WHERE pe."Date"::date = CURRENT_DATE AND p."Status" = 'Novos'
            GROUP BY 
            pe."Id", 
            pe."Nome", 
            pe."Telefone", 
            pe."NomeRua", 
            pe."NumeroRua", 
            pe."Bairro", 
            pe."Cidade",
            pe."Date";
            `
        return result
    }
    finally {
        reserved.release()
    }

}

export async function PedidoEntregaEmPreparoHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            SELECT
            pe.*,
            json_agg(p.*) as "pedidos"
            FROM ${reserved("PedidoEntregas")} pe
            JOIN ${reserved("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            WHERE pe."Date"::date = CURRENT_DATE AND p."Status" = 'Em Preparo'
            GROUP BY 
            pe."Id", 
            pe."Nome", 
            pe."Telefone", 
            pe."NomeRua", 
            pe."NumeroRua", 
            pe."Bairro", 
            pe."Cidade",
            pe."Date";
            `
        return result
    }
    finally {
        reserved.release()
    }

}

export async function PedidoEntregaProntosHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoEntrega[] = await reserved<PedidoEntrega[]>`
            SELECT
            pe.*,
            json_agg(p.*) as "pedidos"
            FROM ${reserved("PedidoEntregas")} pe
            JOIN ${reserved("Pedidos")} p
            ON p."PedidoEntregaId" = pe."Id"
            WHERE pe."Date"::date = CURRENT_DATE AND p."Status" = 'Prontos'
            GROUP BY 
            pe."Id", 
            pe."Nome", 
            pe."Telefone", 
            pe."NomeRua", 
            pe."NumeroRua", 
            pe."Bairro", 
            pe."Cidade",
            pe."Date";
            `
        return result
    }
    finally {
        reserved.release()
    }

}

export async function UpdateEntregaService(entrega: PedidoEntrega) {
    const reserved = await postgresSQL.reserve()
    const formattedRetirada = {
        Id: entrega.Id,
        Date: entrega.Date,
        Nome: entrega.Nome,
        Telefone: entrega.Telefone
    }
    try {
        await reserved`UPDATE "PedidoRetiradas" SET ${reserved(formattedRetirada)} WHERE "Id" = ${entrega.Id}`

        await reserved`INSERT INTO "Pedidos" 
            ${reserved(entrega.pedidos, "Id", "Valor", "Tamanho", "Mistura", "Guarnicao", "Status", "PedidoRetiradaId")}
            ON CONFLICT ("Id") DO UPDATE SET
            "Valor" = EXCLUDED."Valor",
            "Tamanho" = EXCLUDED."Tamanho",
            "Mistura" = EXCLUDED."Mistura",
            "Guarnicao" = EXCLUDED."Guarnicao",
            "Status" = EXCLUDED."Status",
            "PedidoRetiradaId" = EXCLUDED."PedidoRetiradaId"
            `
        
    } catch (error) {
        console.error("Ops houve um erro: ", error)
    } finally {
        reserved.release()
    }
}