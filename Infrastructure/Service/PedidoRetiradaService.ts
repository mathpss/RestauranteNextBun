'use server'
import { PedidoRetirada } from '@/Domain/Model/PedidoRetirada'
import { postgresSQL } from '../Database/db'

export async function CriarPedidoRetirada(pedido: Omit<PedidoRetirada, "Id" | "Date">) {
    const reserved = await postgresSQL.reserve()

    try {
        const [retiradaID]: PedidoRetirada[] = await reserved<PedidoRetirada[]>`
                INSERT INTO ${reserved("PedidoRetiradas")} ("Nome", "Telefone", "Date")
                VALUES (${pedido.Nome}, ${pedido.Telefone}, now())
                RETURNING *
            `
        const pedidosFormatado = pedido.pedidos.map(item => ({
            "PedidoRetiradaId": retiradaID.Id,
            "Valor": item.Valor,
            "Tamanho": item.Tamanho,
            "Mistura": reserved.array(item.Mistura),
            "Guarnicao": reserved.array(item.Guarnicao)
        }))
        await reserved`
                INSERT INTO ${reserved("Pedidos")} 
                ${reserved(pedidosFormatado, "Valor", "Tamanho", "Mistura", "Guarnicao", "PedidoRetiradaId")}
            `

    } catch (error) {
        console.error("Erro na inserção, transação não convertida ", error)
    }
    finally {
        reserved.release()
    }
}

export async function ListaPedidoRetirada(): Promise<PedidoRetirada[]> {
    const reserved = await postgresSQL.reserve()

    try {
        const result: PedidoRetirada[] = await reserved<PedidoRetirada[]>`SELECT 
                            p.*, 
                            pr.* FROM ${reserved("PedidoRetiradas")} pr
                            JOIN  ${reserved("Pedidos")} p
                            ON p."PedidoRetiradaId" = pr."Id"
                `
        return result
    }
    finally {
        reserved.release()
    }

}

export async function ListaPedidoRetiradaHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoRetirada[] = await reserved<PedidoRetirada[]>`
                SELECT 
                pr.*,
                json_agg(p.*) as "pedidos"
                FROM "PedidoRetiradas" pr
                JOIN "Pedidos" p ON p."PedidoRetiradaId" = pr."Id"
                WHERE pr."Date"::date = CURRENT_DATE
                GROUP BY pr."Id",
                pr."Nome",
                pr."Telefone";
                `
        return result
    }
    finally {
        reserved.release()
    }
}

export async function PedidosRetiradasNovosHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoRetirada[] = await reserved<PedidoRetirada[]>
            `
        SELECT pr.*,
        json_agg(p.*) as "pedidos"
        FROM "PedidoRetiradas" pr
        JOIN "Pedidos" p ON p."PedidoRetiradaId" = pr."Id"
        WHERE pr."Date"::date = CURRENT_DATE AND p."Status" = 'Novos'
        GROUP BY pr."Id",
        pr."Nome",
        pr."Telefone"
        `
        return result
    }
    finally {
        reserved.release()
    }
}

export async function PedidosRetiradasEmPreparoHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoRetirada[] = await reserved<PedidoRetirada[]>
            `
        SELECT pr.*,
        json_agg(p.*) as "pedidos"
        FROM "PedidoRetiradas" pr
        JOIN "Pedidos" p ON p."PedidoRetiradaId" = pr."Id"
        WHERE pr."Date"::date = CURRENT_DATE AND p."Status" = 'Em Preparo'
        GROUP BY pr."Id",
        pr."Nome",
        pr."Telefone"
        `
        return result
    }
    finally {
        reserved.release()
    }
}

export async function PedidosRetiradasProntosHoje() {
    const reserved = await postgresSQL.reserve()
    try {
        const result: PedidoRetirada[] = await reserved<PedidoRetirada[]>
            `
        SELECT pr.*,
        json_agg(p.*) as "pedidos"
        FROM "PedidoRetiradas" pr
        JOIN "Pedidos" p ON p."PedidoRetiradaId" = pr."Id"
        WHERE pr."Date"::date = CURRENT_DATE AND p."Status" = 'Prontos'
        GROUP BY pr."Id",
        pr."Nome",
        pr."Telefone"
        `
        return result
    }
    finally {
        reserved.release()
    }
}

export async function UpdateRetiradaService(retirada: PedidoRetirada) {
    const reserved = await postgresSQL.reserve()
    const formattedRetirada = {
        Id: retirada.Id,
        Date: retirada.Date,
        Nome: retirada.Nome,
        Telefone: retirada.Telefone
    }
    try {
        await reserved`UPDATE "PedidoRetiradas" SET ${reserved(formattedRetirada)} WHERE "Id" = ${retirada.Id}`

        await reserved`INSERT INTO "Pedidos" 
            ${reserved(retirada.pedidos, "Id", "Valor", "Tamanho", "Mistura", "Guarnicao", "Status", "PedidoRetiradaId")}
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