'use server'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega";
import { PedidoModel } from "@/Domain/Model/PedidoModel";
import { CriarPedidoEntraga } from "@/Infrastructure/Service/PedidoEntregaService";

export async function pedidoEntregaAction(form: FormData) {
    const nomeForm = form.get('nome') as string
    const telefoneForm = form.get('telefone') as string
    const cidadeForm = form.get('cidade') as string
    const bairroForm = form.get('bairro') as string
    const nomeRuaForm = form.get('nomeRua') as string
    const numeroRuaForm = form.get('numeroRua') as string
    const jsonstringfy = form.get("pedidos") as string

    const objpedidosForm: Omit<PedidoModel[], "Status"> = JSON.parse(jsonstringfy)

    const misturaArray = objpedidosForm.map(x =>
        Object.entries(x.Mistura)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ))
    const guarnicaoArray = objpedidosForm.map(x =>
        Object.entries(x.Guarnicao)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ));

    const pedidoEntrefa: Omit<PedidoEntrega, "Id" | "Date"> = {
        Nome: nomeForm,
        Telefone: telefoneForm,
        Cidade: cidadeForm,
        Bairro: bairroForm,
        NomeRua: nomeRuaForm,
        NumeroRua: numeroRuaForm,
        pedidos: objpedidosForm.map((item, index) => item = {
            Valor: item.Valor,
            Tamanho: item.Tamanho,
            Status: "Novos",
            Mistura: misturaArray[index],
            Guarnicao: guarnicaoArray[index],
        })
    }

    await CriarPedidoEntraga(pedidoEntrefa)
}