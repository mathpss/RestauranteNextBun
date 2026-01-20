import { PedidoModel } from "./PedidoModel";

export interface PedidoRetirada{
    Id:number,
    nome:string,
    telefone: string,
    pedidos: PedidoModel[]
    
}