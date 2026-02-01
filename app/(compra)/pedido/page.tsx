'use client'
import { usePedido } from "@/app/_context/_pedidosProvider/usePedidos";
import { ChosenPedido } from "@/components/chosenPedido";
import { CounterPedido } from "@/components/counterPedido";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cardapio } from "@/Domain/Model/Cardapio";
import { CardapioServiceGet } from "@/Infrastructure/Service/CardapioService";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type CounterMistura = {
    [x: string]: number
}

type CounterGuarnicao = {
    [x: string]: number
}

type Pedido = {
    mistura?: CounterMistura,
    guarnicao?: CounterGuarnicao
    tamanho: 'p' | 'm' | 'g'
    valor?: number
}

export default function Pedido() {
    const [misturaPedido, setMisturaPedido] = useState<CounterMistura>()
    const [guarnicaoPedido, setGuarnicaoPedido] = useState<CounterGuarnicao>()
    const [cart, setCart] = useState<Pedido[]>([])
    const [counterMistura, setCounterMistura] = useState<number[]>([])
    const [counterGuarnicao, setCounterGuarnicao] = useState<number[]>([])
    const [cardapio, setCardapio] = useState<Cardapio | null>(null)
    const mistura = cardapio?.Mistura.split(',').map(x => x.trim())
    const guarnicao = cardapio?.Guarnicao.split(',').map(x => x.trim())
    const listaPedidos = usePedido()

    useEffect(() => {
        const getCardapio = async () => {
            const result = await CardapioServiceGet()
            setCardapio(result)
            setCounterMistura(Array(mistura?.length).fill(0))
            setCounterGuarnicao(Array(guarnicao?.length).fill(0))
        }
        getCardapio()
    }, [mistura?.length, guarnicao?.length])

    useEffect(() => {
        listaPedidos.setPedidos(cart)
    }, [cart, listaPedidos])

    const counterPlusMistura = (index: number, item: string) => {
        const checker = counterMistura?.reduce((acc, curr) => acc + curr, 0)
        const increment = counterMistura![index]

        if (!!checker && checker > 1) return

        setCounterMistura(prev => prev?.map((count, i) =>
            (i === index ? count + 1 : count))
        )
        setMisturaPedido(prev => {
            return {
                ...prev, [item]: increment + 1
            }
        })
    }

    const counterLessMistura = (index: number, item: string) => {
        const checker = counterMistura?.reduce((acc, curr) => acc + curr, 0)
        const increment = counterMistura![index]

        if (!!checker && checker > 0) {

            setCounterMistura(prev => prev?.map((count, i) =>
                (i === index ? count - 1 : count))
            )
            setMisturaPedido(prev => {
                return {
                    ...prev, [item]: increment - 1
                }
            })
        }
    }

    const counterPlusGuarnicao = (index: number, item: string) => {
        const checker = counterGuarnicao?.reduce((acc, curr) => acc + curr, 0)
        const increment = counterGuarnicao![index]

        if (!!checker && checker > 2) return

        setCounterGuarnicao(prev => prev?.map((count, i) =>
            (i === index ? count + 1 : count))
        )
        setGuarnicaoPedido(prev => {
            return {
                ...prev, [item]: increment + 1
            }
        })
    }

    const counterLessGuarnicao = (index: number, item: string) => {
        const checker = counterGuarnicao?.reduce((acc, curr) => acc + curr, 0)
        const increment = counterGuarnicao![index]

        if (!!checker && checker > 0) {

            setCounterGuarnicao(prev => prev?.map((count, i) =>
                (i === index ? count - 1 : count))
            )
            setGuarnicaoPedido(prev => {
                return {
                    ...prev, [item]: increment - 1
                }
            })
        }
    }

    const pushPedidoSizeP = () => {
        const pedido: Pedido = {
            mistura: misturaPedido,
            guarnicao: guarnicaoPedido,
            tamanho: "p",
            valor: 17
        }

        setCart(prev => [...prev, pedido])
        setMisturaPedido(undefined)
        setGuarnicaoPedido(undefined)
        setCounterGuarnicao(Array(guarnicao?.length).fill(0))
        setCounterMistura(Array(mistura?.length).fill(0))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })

    }

    const pushPedidoSizeM = () => {
        const pedido: Pedido = {
            mistura: misturaPedido,
            guarnicao: guarnicaoPedido,
            tamanho: "m",
            valor: 20
        }

        setCart(prev => [...prev, pedido])
        setMisturaPedido(undefined)
        setGuarnicaoPedido(undefined)
        setCounterGuarnicao(Array(guarnicao?.length).fill(0))
        setCounterMistura(Array(mistura?.length).fill(0))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })

    }

    const pushPedidoSizeG = () => {
        const pedido: Pedido = {
            mistura: misturaPedido,
            guarnicao: guarnicaoPedido,
            tamanho: "g",
            valor: 22
        }

        setCart(prev => [...prev, pedido])
        setMisturaPedido(undefined)
        setGuarnicaoPedido(undefined)
        setCounterGuarnicao(Array(guarnicao?.length).fill(0))
        setCounterMistura(Array(mistura?.length).fill(0))
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })

    }

    return (
        <main className='flex flex-col justify-center items-center 
        bg-[url(/images/prato.jpg)] 
        min-h-dvh h-full w-full'
        >
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="z-10 bg-amber-400 fixed right-8 top-4
                text-white text-xl px-6 py-4 rounded-xl hover:bg-amber-400/90">
                        <ShoppingCart />
                        <div className=" text-sm absolute bottom-0 right-3">{cart ? cart.length : 0}</div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-transparent backdrop-blur-2xl ">
                    {cart.map((item, index) => (
                        <DropdownMenuLabel key={index}>
                            <p className="text-amber-400">Pedido: {index + 1}</p>
                            {!!item.mistura &&
                                <p>Misturas: {Object.entries(item.mistura)
                                    .map(([chave, valor]) => (
                                        <ul key={chave}>
                                            <li>
                                                {chave}: {valor}
                                            </li>
                                        </ul>
                                    ))}
                                </p>
                            }
                            {!!item.guarnicao &&
                                <p>Guarnições: {Object.entries(item.guarnicao)
                                    .map(([chave, valor]) => (
                                        <ul key={chave}>
                                            <li>
                                                {chave}: {valor}
                                            </li>
                                        </ul>
                                    ))}
                                </p>
                            }
                            <p>Tamanho: {item.tamanho}</p>
                            <p>Valor: {item.valor}</p>
                            <DropdownMenuSeparator />
                        </DropdownMenuLabel>
                    ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <Card className="h-auto min-w-[70%] bg-transparent backdrop-blur-2xl ">
                <CardHeader>
                    <CardTitle className="text-center text-amber-400 text-5xl whitespace-nowrap">
                        Cardápio do dia
                    </CardTitle>

                </CardHeader>
                <CardContent className="text-center text-gray-900 text-xl">
                    <p className="text-center text-amber-400 text-3xl mb-3">Misturas (2 opções)</p>
                    {mistura?.map((item, index) => (<div className="flex w-full border-b-2 mb-3 justify-between" key={index}>
                        <div className="" > {item} </div>
                        <CounterPedido count={counterMistura !== undefined ?
                            counterMistura[index] :
                            0
                        }
                            counterPlus={() => counterPlusMistura(index, item)}
                            counterLess={() => counterLessMistura(index, item)}
                        />
                    </div>
                    ))}
                    <p className="text-center text-amber-400 text-3xl mb-3">Guarnições (3 opções)</p>
                    {guarnicao?.map((item, index) => (<div className="flex w-full border-b-2 mb-3 justify-between" key={index}>
                        <div className="" > {item} </div>
                        <CounterPedido
                            count={counterGuarnicao !== undefined ?
                                counterGuarnicao[index] :
                                0
                            }
                            counterPlus={() => counterPlusGuarnicao(index, item)}
                            counterLess={() => counterLessGuarnicao(index, item)}
                        />
                    </div>
                    ))}
                </CardContent>
            </Card>

            <ChosenPedido pushPedidoSizeP={pushPedidoSizeP}
                pushPedidoSizeM={pushPedidoSizeM}
                pushPedidoSizeG={pushPedidoSizeG}
            />
            {
                !!listaPedidos.pedidos.length &&
                <Link className="bg-amber-400 fixed right-2 bottom-4
                   text-white text-xl px-4 py-2 rounded-xl hover:bg-amber-400/90"
                    href={"/pedido/confirmacao"}
                >
                    Montar Pedido
                </Link>
            }

        </main>
    );
}