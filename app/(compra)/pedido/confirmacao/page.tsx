'use client'
import { pedidoEntregaAction } from "@/app/_action/pedidoEntregaAction"
import { pedidoRetiradaAction } from "@/app/_action/pedidoRetiradaAction"
import { usePedido } from "@/app/_context/_pedidosProvider/usePedidos"
import { FormEntrega } from "@/components/FormEntrega"
import { FormRetirada } from "@/components/FormRetirada"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function Confirmacao() {
    const listaPedido = usePedido()
    const [isRetirada, setIsRetirada] = useState(false)

    function handleRetirada() {
        setIsRetirada(true)
    }

    function handleEntrega() {
        setIsRetirada(false)
    }
    return (
        <main className='flex justify-center items-center 
            bg-[url(/images/prato.jpg)] 
            min-h-dvh h-full w-full'
        >
            <Card className="h-auto min-w-[70%] bg-transparent backdrop-blur-3xl ">
                <CardHeader className="">
                    <CardTitle className="text-center text-amber-400 text-5xl ">
                        Pedido Confirmado !
                    </CardTitle>
                    <CardDescription className="text-amber-900 text-lg text-center">
                        Como você gostaria de receber o seu pedido?
                    </CardDescription>
                    <div className="flex gap-10 items-center justify-center">
                        <Button className={isRetirada ?
                            "bg-amber-400 text-amber-100 cursor-pointer" :
                            "border border-amber-100 bg-transparent backdrop-blur-3xl text-amber-100 cursor-pointer"
                        }
                            onClick={handleRetirada}
                        >
                            Retirada
                        </Button>
                        <Button className={isRetirada ?
                            "border border-amber-100 bg-transparent backdrop-blur-3xl text-amber-100 cursor-pointer" :
                            "bg-amber-400 text-amber-100 cursor-pointer"
                        }
                            onClick={handleEntrega}
                        >
                            Entrega
                        </Button>
                    </div>

                </CardHeader>
                <CardContent className=" text-xl">
                    {
                        isRetirada ?
                            <FormRetirada action={pedidoRetiradaAction}
                                pedidos={listaPedido.pedidos} />
                            :
                            <FormEntrega action={pedidoEntregaAction}
                                pedidos={listaPedido.pedidos} />
                    }

                </CardContent>
                <CardFooter className="text-center cursor-pointer">
                    <Link href={'/'}>
                        Voltar ao início
                    </Link>
                </CardFooter>
            </Card>


        </main >
    )
}