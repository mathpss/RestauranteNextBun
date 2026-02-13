'use server'

import { PedidoModel } from "@/Domain/Model/PedidoModel"
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada"
import { CriarPedidoRetirada } from "@/Infrastructure/Service/PedidoRetiradaService"


export async function pedidoRetiradaAction(form: FormData) {
    const nomeForm = form.get("nome") as string
    const telefoneForm = form.get("telefone") as string
    const jsonstringfy = form.get("pedidos") as string

    const objpedidosForm: Omit<PedidoModel[], "Status"> = JSON.parse(jsonstringfy)

    console.log(objpedidosForm)
    
    const misturaArray = objpedidosForm.map(x =>
        Object.entries(x.Mistura)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ))
    const guarnicaoArray = objpedidosForm.map(x =>
        Object.entries(x.Guarnicao)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ));

    const pedidoRetirada: Omit<PedidoRetirada, "Id" | "Date"> = {
        Nome: nomeForm,
        Telefone: telefoneForm,
        pedidos: objpedidosForm.map((item, index) => item = {
            Valor: item.Valor,
            Tamanho: item.Tamanho,
            Status: "Novos",
            Mistura: misturaArray[index],
            Guarnicao: guarnicaoArray[index],
        })
    }
    await CriarPedidoRetirada(pedidoRetirada)
}