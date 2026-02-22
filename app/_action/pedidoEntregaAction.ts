'use server'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega";
import { PedidoModel } from "@/Domain/Model/PedidoModel";
import { CriarPedidoEntraga } from "@/Infrastructure/Service/PedidoEntregaService";
import * as z from "zod";

const User = z.object({
    nome: z.string().min(3, 'Insira seu nome, deve ter no minimo 3 dígitos'),
    telefone: z.string().min(11, "Por favor insira os 11 números do telefone"),
    cidade: z.string().min(3, 'Insira uma cidade, deve ter no minimo 3 dígitos'),
    bairro: z.string().min(3, 'Insira um bairro, deve ter no minimo 3 dígitos'),
    nomeRua: z.string().min(3, 'Insira um nome de rua, deve ter no minimo 3 dígitos'),
    numeroRua: z.string().min(1, 'Insira o número da casa'),
    pedidos: z.string()
})

export async function pedidoEntregaAction(_:unknown, form: FormData) {

    const rawData = Object.fromEntries(form.entries())
    const validatedFields = User.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Dados inválidos. Verifique os campos."
        }
    }

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