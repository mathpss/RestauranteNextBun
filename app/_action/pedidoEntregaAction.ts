'use server'

import { CriarPedidoEntraga } from "@/Infrastructure/Service/PedidoEntregaService";

type Pedido = {
    guarnicao: string[],
    mistura: string[],
    tamanho: 'p' | 'm' | 'g',
    valor: number
};

type EntregaPedido = {
    nome: string,
    telefone: string,
    pedidos: Pedido[],
    nomeRua: string,
    numeroRua: string,
    bairro: string,
    cidade:string
}
export async function pedidoEntregaAction(form: FormData) {
    const nomeForm = form.get('nome') as string
    const telefoneForm = form.get('telefone') as string
    const cidadeForm = form.get('cidade') as string
    const bairroForm = form.get('bairro') as string
    const nomeRuaForm = form.get('nomeRua') as string
    const numeroRuaForm = form.get('numeroRua') as string
    const jsonstringfy = form.get("pedidos") as string

    const objpedidosForm: Pedido[] = JSON.parse(jsonstringfy)

    const misturaArray = objpedidosForm.map(x =>
        Object.entries(x.mistura)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ))
    const guarnicaoArray = objpedidosForm.map(x =>
        Object.entries(x.guarnicao)
            .flatMap(([item, qtd]) => (Array(Number(qtd)).fill(item))
            ));

    const pedidoEntrefa: EntregaPedido = {
        nome: nomeForm,
        telefone: telefoneForm,
        cidade: cidadeForm,
        bairro: bairroForm,
        nomeRua: nomeRuaForm,
        numeroRua: numeroRuaForm,
        pedidos: objpedidosForm.map((item, index) => item = {
            valor: item.valor,
            tamanho: item.tamanho,
            mistura: misturaArray[index],
            guarnicao: guarnicaoArray[index],
        })
    }

    await CriarPedidoEntraga(pedidoEntrefa)
}