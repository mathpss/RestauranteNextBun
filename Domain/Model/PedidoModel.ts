export interface PedidoModel{
    
    valor:number,
    tamanho:string,
    guarnicao:string[],
    mistura: string[],
    pedidoRetiradaId?: number,
    pedidoEntregaId?:number
}