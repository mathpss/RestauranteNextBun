
export type Pedido = {
    mistura?: Record<string, number>,
    guarnicao?: Record<string, number>,
    tamanho: 'p' | 'm' | 'g'
};

export interface IPedidoContext{
    pedidos: Pedido[],
    setPedidos: (pedidos:Pedido[])=>void
}