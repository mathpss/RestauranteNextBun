'use server'
import { PedidoRetirada } from '@/Domain/Model/PedidoRetirada'
import { postgres } from '../Database/db'

export async function CriarPedidoRetirada(pedido:Omit <PedidoRetirada, 'Id'>) {
    const reserved = await postgres.reserve()

    try {
        await reserved.begin(async sql => {
            const [retiradaID]:PedidoRetirada[] = await sql`
                INSERT INTO ${sql("PedidoRetiradas")} ("Nome", "Telefone", "Date")
                VALUES (${pedido.nome}, ${pedido.telefone}, now())
                RETURNING *
            `

            const pedidosFormatado = pedido.pedidos.map(item =>  ({
                "PedidoRetiradaId": retiradaID.Id,
                "Valor": item.valor,
                "Tamanho": item.tamanho,
                "Mistura": sql.array(item.mistura, 'TEXT'),
                "Guarnicao": sql.array(item.guarnicao, 'TEXT')
                
            }))
            await sql`
                INSERT INTO ${sql("Pedidos")} 
                ${sql(pedidosFormatado, "Valor", "Tamanho", "Mistura", "Guarnicao", "PedidoRetiradaId" )}
            `
        } )
    } catch (error) {
        console.error("Erro na inserção, transação não convertida ", error)
    }
    finally {
        reserved.release()
    }
}


export async function ListaPedidoRetirada(): Promise<PedidoRetirada[]> {
    const reserved = await postgres.reserve()

    try {
        const result: PedidoRetirada[] = await reserved.begin(async sql => {
            return await sql`SELECT 
                            p.*, 
                            pr.* FROM ${sql("PedidoRetiradas")} pr
                            JOIN  ${sql("Pedidos")} p
                            ON p."PedidoRetiradaId" = pr."Id"
                `
        })

        return result
    }
    finally {
        reserved.release()
    }

}