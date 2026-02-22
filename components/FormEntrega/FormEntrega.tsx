'use client'
import Form from "next/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState } from "react";
import { pedidoEntregaAction } from "@/app/_action/pedidoEntregaAction";

type Pedido = {
    Mistura?: Record<string, number>,
    Guarnicao?: Record<string, number>,
    Tamanho: 'p' | 'm' | 'g'
    Valor?: number
}

type FormEntregaProps = {
    pedidos: Pedido[]
}

export function FormEntrega({ pedidos }: FormEntregaProps) {
    const [state, handleForm, isPending] = useActionState(pedidoEntregaAction, null)

    return (
        <Form className="flex flex-col gap-2" action={handleForm}>
            <Input className="placeholder:text-amber-100" placeholder="Nome *"
                name="nome" required
            />
            {state?.errors?.nome && <span className="text-red-500 text-sm">{state.errors.nome}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Telefone *"
                name="telefone" required
            />
            {state?.errors?.telefone && <span className="text-red-500 text-sm">{state.errors.telefone}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Cidade *"
                name="cidade" required
            />
            {state?.errors?.cidade && <span className="text-red-500 text-sm">{state.errors.cidade}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Bairro *"
                name="bairro" required
            />
            {state?.errors?.bairro && <span className="text-red-500 text-sm">{state.errors.bairro}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Nome da Rua *"
                name="nomeRua" required
            />
            {state?.errors?.nomeRua && <span className="text-red-500 text-sm">{state.errors.nomeRua}</span>}
            <Input className="placeholder:text-amber-100" placeholder="Número da Rua *"
                name="numeroRua" required
            />
            {state?.errors?.numeroRua && <span className="text-red-500 text-sm">{state.errors.numeroRua}</span>}
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