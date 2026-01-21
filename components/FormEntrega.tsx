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

type FormEntregaProps = {
    action: (formData: FormData) => Promise<void>
    pedidos: Pedido[]
}

export function FormEntrega({ action, pedidos }: FormEntregaProps) {
    
    return (
        <Form  className="flex flex-col gap-2" action={action}>
            <Input className="placeholder:text-amber-100" placeholder="Nome *" 
                name="nome" required
            />
            
            <Input className="placeholder:text-amber-100" placeholder="Telefone *"
            name="telefone" required
            />

            <Input className="placeholder:text-amber-100" placeholder="Cidade *"
            name="cidade" required
            />

            <Input className="placeholder:text-amber-100" placeholder="Bairro *"
            name="bairro" required
            />

            <Input className="placeholder:text-amber-100" placeholder="Nome da Rua *"
            name="nomeRua" required
            />

            <Input className="placeholder:text-amber-100" placeholder="Número da Rua *"
            name="numeroRua" required
            />
            <input type="hidden"
                name="pedidos"
                value={JSON.stringify(pedidos)}
            />
            <Button className="bg-amber-400 cursor-pointer text-white">Finalizar Pedido</Button>
        </Form>
    )
}