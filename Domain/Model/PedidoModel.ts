export interface PedidoModel{
    Id?:number,
    Valor:number,
    Tamanho:string,
    Guarnicao:string[],
    Mistura: string[],
    PedidoRetiradaId?: number,
    PedidoEntregaId?: number,
    Status: "Novos" | "Em Preparo" | "Prontos"
}