
import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega"
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada"
import { useEffect, useState } from "react"

interface ICardsModoCozinhaNovosProps {
    retiradaEntrega: PedidoRetirada | PedidoEntrega,
    handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function CardsModoCozinhaNovos({ retiradaEntrega, handleUpdate }: ICardsModoCozinhaNovosProps) {
    const [minutagem, setMinutagem] = useState(0)

    useEffect(() => {
        async function getMinutagem() {
            if (retiradaEntrega) {
                {
                    setMinutagem(Math.floor(
                        (Date.now() - new Date(retiradaEntrega.Date).getTime()) / 60000))
                }
            }
        }
        getMinutagem()

    }, [retiradaEntrega.Date])

    return (

        <div className="flex flex-col p-3 border border-[#3C8CF6]/20 rounded-3xl">

            <div className="flex items-center justify-between">
                <p className="text-[#0F1729] text-3xl font-medium">{`#${retiradaEntrega.Id}`}</p>
                <p className="text-[#65758B] text-xl">{minutagem} min</p>
            </div>

            { retiradaEntrega.pedidos.map((x, i) => (

                    <div key={i}>
                        <p className="text-[#3C8CF6] font-medium">Pedido: {i + 1}</p>
                        mistura: {Object.entries(x.Mistura.reduce((acc: Record<string, number>, next) => {
                            acc[next] = (acc[next] || 0) + 1
                            return acc
                        }, {}))
                            .map(([chave, valor]) => (
                                <ul key={chave}>
                                    <li>
                                        {valor}x {chave}
                                    </li>
                                </ul>
                            ))
                        }
                        guarnição: {Object.entries(x.Guarnicao.reduce((acc: Record<string, number>, next) => {
                            acc[next] = (acc[next] || 0) + 1
                            return acc
                        }, {}))
                            .map(([chave, valor]) => (
                                <ul key={chave}>
                                    <li>
                                        {valor}x {chave}
                                    </li>
                                </ul>
                            ))
                        }


                    </div>
                ))}
            <button className="border border-[#3C8CF6]/20 bg-[#3C8CF6]/10 text-lg
            text-[#3C8CF6] font-medium cursor-pointer px-8 py-4 rounded-3xl"
                onClick={handleUpdate}
            >
                Iniciar Preparo
            </button>

        </div>

    )
}