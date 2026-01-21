import { PedidoModel } from "./PedidoModel";

export interface PedidoEntrega{
    Id:number,
    nome:string,
    telefone: string,
    pedidos: PedidoModel[],
    nomeRua: string,
    numeroRua: string,
    bairro: string,
    cidade:string
}