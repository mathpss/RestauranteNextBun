import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega";
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada";

interface ICardsModoCozinhaProntosProps {
    retiradaEntrega: PedidoRetirada | PedidoEntrega,
}

export function CardsModoCozinhaProntos({ retiradaEntrega }: ICardsModoCozinhaProntosProps) {

    return (
        <div className="flex flex-col p-3 border border-[#21C45D]/20 rounded-3xl">
            <div className="flex items-center justify-between">
                <p className="text-[#0F1729] text-3xl font-medium">{`#${retiradaEntrega.Id}`}</p>

            </div>
            {retiradaEntrega.pedidos.map((x, i) => (

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
            <button>

            </button>
        </div>
    )
}