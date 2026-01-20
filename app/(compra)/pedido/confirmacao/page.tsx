'use client'
import { pedidoRetiradaAction } from "@/app/_action/pedidoRetiradaAction"
import { usePedido } from "@/app/_context/_pedidosProvider/usePedidos"
import { FormRetirada } from "@/components/FormRetirada"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Form from 'next/form'
import Link from "next/link"

export default function Confirmacao() {
    const listaPedido = usePedido()

    

    return (
        <main className='flex justify-center items-center 
            bg-[url(/images/prato.jpg)] 
            min-h-dvh h-full w-full'
        >
            <Card className="h-auto min-w-[70%] bg-transparent backdrop-blur-2xl ">
                <CardHeader className="">
                    <CardTitle className="text-center text-amber-400 text-5xl ">
                        Pedido Confirmado !
                    </CardTitle>
                    <CardDescription className="text-amber-900 text-lg text-center">
                        Como você gostaria de receber o seu pedido?
                    </CardDescription>
                    <div className="flex gap-2 items-center justify-center">
                        <Button className="bg-amber-400 text-white cursor-pointer"
                        >
                            Retirada
                        </Button>
                        <Button className="bg-amber-400 text-white cursor-pointer"
                        >
                            Entrega
                        </Button>
                    </div>

                </CardHeader>
                <CardContent className=" text-xl">
                    <FormRetirada action={pedidoRetiradaAction} pedidos={listaPedido.pedidos } />

                </CardContent>
                <CardFooter className="text-center">
                    <Link href={'/'}>
                        Voltar ao início
                    </Link>
                </CardFooter>
            </Card>


        </main>
    )
}