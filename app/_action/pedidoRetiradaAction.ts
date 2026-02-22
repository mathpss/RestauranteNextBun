'use server'
import { PedidoModel } from "@/Domain/Model/PedidoModel"
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada"
import { CriarPedidoRetirada } from "@/Infrastructure/Service/PedidoRetiradaService"
import * as z from "zod";

const User = z.object({
    nome: z.string().min(3, 'Insira seu nome, deve ter no minimo 3 dígitos'),
    telefone: z.string().min(11, "Por favor insira os 11 números do telefone"),
    pedidos: z.string()
})

export async function pedidoRetiradaAction(_:unknown , form: FormData) {

    const rawData = Object.fromEntries(form.entries())
    const validatedFields = User.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Dados inválidos. Verifique os campos."
        }
    }

    const nomeForm = form.get("nome") as string
    const telefoneForm = form.get("telefone") as string
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