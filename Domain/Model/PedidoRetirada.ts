import { PedidoModel } from "./PedidoModel";

export interface PedidoRetirada{
    Id:number,
    Nome:string,
    Telefone: string,
    pedidos: PedidoModel[],
    Date: Date
    
}