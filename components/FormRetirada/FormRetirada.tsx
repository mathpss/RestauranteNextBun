'use client'
import Form from "next/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState } from "react";
import { pedidoRetiradaAction } from "@/app/_action/pedidoRetiradaAction";
type Pedido = {
    Mistura?: Record<string, number>,
    Guarnicao?: Record<string, number>,
    Tamanho: 'p' | 'm' | 'g'
    Valor?: number
}
type FormRetiradaProps = {
    pedidos: Pedido[]
}

export function FormRetirada({ pedidos }: FormRetiradaProps) {
    const [state, formAction, isPending] = useActionState(pedidoRetiradaAction, null)

    return (
        <Form className="flex flex-col gap-2" action={formAction}>
            <Input className="placeholder:text-amber-100" placeholder="Nome *"
                name="nome" required
            />
            {state?.errors?.nome && <span className="text-red-500 text-sm">{state.errors.nome}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Telefone *"
                name="telefone" required
            />
            {state?.errors?.telefone && <span className="text-red-500 text-sm">{state.errors.telefone}</span>}
            <input type="hidden"
                name="pedidos"
                value={JSON.stringify(pedidos)}
            />
            <Button disabled={isPending} className="bg-amber-400 cursor-pointer text-white">
                {isPending ? "Enviando..." : "Finalizar Pedido"}
            </Button>
        </Form>
    )
}