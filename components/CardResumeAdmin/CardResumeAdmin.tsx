'use client'
import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega";
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada";
import { ListaPedidoEntregaHoje, PedidoEntregaEmPreparoHoje, PedidoEntregaNovosHoje, PedidoEntregaProntosHoje } from "@/Infrastructure/Service/PedidoEntregaService";
import { ListaPedidoRetiradaHoje, PedidosRetiradasEmPreparoHoje, PedidosRetiradasNovosHoje, PedidosRetiradasProntosHoje } from "@/Infrastructure/Service/PedidoRetiradaService";
import { CircleCheckBig, ClipboardPen, Clock, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function CardResumeAdmin() {
    const [entregasHoje, setEntregasHoje] = useState<PedidoEntrega[] | null>(null)
    const [retiradasHoje, setRetiradasHoje] = useState<PedidoRetirada[] | null>(null)
    const [pedidosHoje, setPedidosHoje] = useState<(PedidoEntrega | PedidoRetirada)[] | null>(null)

    const [entregasNovosHoje, setEntregasNovosHoje] = useState<PedidoEntrega[] | null>(null)
    const [retiradasNovosHoje, setRetiradasNovosHoje] = useState<PedidoRetirada[] | null>(null)
    const [pedidosNovosHoje, setPedidosNovosHoje] = useState<(PedidoEntrega | PedidoRetirada)[] | null>(null)

    const [entregasPreparoHoje, setEntregasPreparoHoje] = useState<PedidoEntrega[] | null>(null)
    const [retiradaPreparoHoje, setRetiradaPreparoHoje] = useState<PedidoRetirada[] | null>(null)
    const [pedidoPreparoHoje, setPedidosPreparoHoje] = useState<(PedidoEntrega | PedidoRetirada)[] | null>(null)

    const [entregasProntosHoje, setEntregasProntosHoje] = useState<PedidoEntrega[] | null>(null)
    const [retiradasProntosHoje, setRetiradasProntosHoje] = useState<PedidoRetirada[] | null>(null)
    const [pedidosProntosHoje, setPedidosProntosHoje] = useState<(PedidoEntrega | PedidoRetirada)[] | null>(null)

    useEffect(() => {
        async function getPedidos() {
            setEntregasHoje(await ListaPedidoEntregaHoje())
            setRetiradasHoje(await ListaPedidoRetiradaHoje())
            setPedidosHoje([...entregasHoje ?? [], ...retiradasHoje ?? []])

            setEntregasNovosHoje(await PedidoEntregaNovosHoje())
            setRetiradasNovosHoje(await PedidosRetiradasNovosHoje())
            setPedidosNovosHoje([...entregasNovosHoje ?? [], ...retiradasNovosHoje ?? []])

            setEntregasPreparoHoje(await PedidoEntregaEmPreparoHoje())
            setRetiradaPreparoHoje(await PedidosRetiradasEmPreparoHoje())
            setPedidosPreparoHoje([...entregasPreparoHoje ?? [], ...retiradaPreparoHoje ?? []])

            setEntregasProntosHoje(await PedidoEntregaProntosHoje())
            setRetiradasProntosHoje(await PedidosRetiradasProntosHoje())
            setPedidosProntosHoje([...entregasProntosHoje ?? [], ...retiradasProntosHoje ?? []])
        }
        getPedidos()
    },
        [
            entregasHoje?.length, retiradasHoje?.length,
            entregasNovosHoje?.length, retiradasNovosHoje?.length,
            entregasPreparoHoje?.length, retiradaPreparoHoje?.length,
            entregasProntosHoje?.length, retiradasProntosHoje?.length
        ]
    )

    return (
        <div className=" grid grid-cols-4 gap-3">
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#F97015]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <ShoppingBag size={20} className="text-[#F97015]" />
                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> {pedidosHoje?.length}</p>
                    <p className="text-[#65758B] text-xl">Pedidos Hoje</p>
                </div>
            </div>
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#3C8CF6]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <ClipboardPen size={20} className="text-[#3C8CF6]" />


                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> {pedidosNovosHoje?.length}</p>
                    <p className="text-[#65758B] text-xl">Novos</p>
                </div>
            </div>
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#FACC14]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <Clock size={20} className="text-[#FACC14]" />

                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> {pedidoPreparoHoje?.length}</p>
                    <p className="text-[#65758B] text-xl">Em Preparo</p>
                </div>
            </div>
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#21C45D]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <CircleCheckBig size={20} className="text-[#21C45D]" />

                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> {pedidosProntosHoje?.length} </p>
                    <p className="text-[#65758B] text-xl">Prontos</p>
                </div>
            </div>

        </div>
    )
}