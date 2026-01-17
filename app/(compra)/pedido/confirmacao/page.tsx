'use client'
import { usePedido } from "@/app/_context/_pedidosProvider/usePedidos"

export default function Confirmacao() {
    const listaPedido = usePedido()

    console.log("Lista de pedido na pagina /pedido/confirmacao", listaPedido.pedidos)
    return (
        <div>
            Página de Confirmação
        </div>
    )
}