import { PedidoModel } from "./PedidoModel";

export interface PedidoEntrega{
    Id:number,
    Nome:string,
    Telefone: string,
    pedidos: PedidoModel[],
    NomeRua: string,
    NumeroRua: string,
    Bairro: string,
    Cidade: string,
    Date: Date
}