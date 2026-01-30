'use server'
import { PedidoRetirada } from '@/Domain/Model/PedidoRetirada'
import { postgresSQL } from '../Database/db'

export async function CriarPedidoRetirada(pedido:Omit <PedidoRetirada, 'Id'>) {
    const reserved = await postgresSQL.reserve()

    try {
            const [retiradaID]:PedidoRetirada[] = await reserved<PedidoRetirada[]>`
                INSERT INTO ${reserved("PedidoRetiradas")} ("Nome", "Telefone", "Date")
                VALUES (${pedido.nome}, ${pedido.telefone}, now())
                RETURNING *
            `
            const pedidosFormatado = pedido.pedidos.map(item =>  ({
                "PedidoRetiradaId": retiradaID.Id,
                "Valor": item.valor,
                "Tamanho": item.tamanho,
                "Mistura": reserved.array(item.mistura),
                "Guarnicao": reserved.array(item.guarnicao)
            }))
            await reserved`
                INSERT INTO ${reserved("Pedidos")} 
                ${reserved(pedidosFormatado, "Valor", "Tamanho", "Mistura", "Guarnicao", "PedidoRetiradaId" )}
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