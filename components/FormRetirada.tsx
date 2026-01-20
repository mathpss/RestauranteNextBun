'use client'
import Form from "next/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Pedido = {
    mistura?: Record<string, number>,
    guarnicao?: Record<string, number>,
    tamanho: 'p' | 'm' | 'g'
    valor?:number
}

type FormRetiradaProps = {
    action: (formData: FormData) => Promise<void>
    pedidos: Pedido[]
}

export function FormRetirada({ action, pedidos }: FormRetiradaProps) {
    
    return (
        <Form  className="flex flex-col gap-2" action={action}>
            <Input className="placeholder:text-amber-900" placeholder="Nome *" 
                name="nome" required
            />
            <Input className="placeholder:text-amber-900" placeholder="Telefone *"
            name="telefone" required
            />
            <input type="hidden"
                name="pedidos"
                value={JSON.stringify(pedidos)}
            />
            <Button className="bg-amber-400 cursor-pointer text-white">Finalizar Pedido</Button>
        </Form>
    )
}