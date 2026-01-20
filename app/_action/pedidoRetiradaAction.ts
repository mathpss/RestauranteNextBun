'use server'

import { PedidoModel } from "@/Domain/Model/PedidoModel"
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada"
import { CriarPedidoRetirada } from "@/Infrastructure/Service/PedidoRetiradaService"

export type Pedido = {
    guarnicao: string[],
    mistura: string[],
    tamanho: 'p' | 'm' | 'g',
    valor: number
};

export type RetiradaPedido = {
    nome: string,
    telefone: string,
    pedidos: Pedido[]
}

export async function pedidoRetiradaAction(form: FormData) {
    const nomeForm = form.get("nome") as string
    const telefoneForm = form.get("telefone") as string
    const jsonstringfy = form.get("pedidos") as string

    const objpedidosForm: Pedido[] = JSON.parse(jsonstringfy)

    const misturaArray = objpedidosForm.map(x =>
        Object.entries(x.mistura)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item)).join(", ")
            ))
    const guarnicaoArray = objpedidosForm.map(x =>
        Object.entries(x.guarnicao)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item)).join(", ")
            ));

    const pedidoRetirada: RetiradaPedido = {
        nome: nomeForm,
        telefone: telefoneForm,
        pedidos: objpedidosForm.map((item, index) => item = {
            valor: item.valor,
            tamanho: item.tamanho,
            mistura: misturaArray[index],
            guarnicao: guarnicaoArray[index],
        })
    }

    await CriarPedidoRetirada(pedidoRetirada)
}