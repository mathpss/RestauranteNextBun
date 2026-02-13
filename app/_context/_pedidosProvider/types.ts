
export type Pedido = {
    Mistura?: Record<string, number>,
    Guarnicao?: Record<string, number>,
    Tamanho: 'p' | 'm' | 'g',
    Valor?:number
};

export interface IPedidoContext{
    pedidos: Pedido[],
    setPedidos: (pedidos:Pedido[])=>void
}