'use client'

import { useEffect, useState } from "react";
import { BadgeStatusAdmin } from "../BadgeStatusAdmin/BadgeStatusAdmin";
import { BadgeTipoAdmin } from "../BadgeTipoAdmin/BadgeTipoAdmin";
import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega";
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada";
import { ListaPedidoEntregaHoje } from "@/Infrastructure/Service/PedidoEntregaService";
import { ListaPedidoRetiradaHoje } from "@/Infrastructure/Service/PedidoRetiradaService";
import { Eye } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";

export function PedidosTableAdmin() {
    const [entregasHoje, setEntregasHoje] = useState<PedidoEntrega[] | null>(null)
    const [retiradasHoje, setRetiradasHoje] = useState<PedidoRetirada[] | null>(null)
    const pedidosHoje = [...entregasHoje ?? [], ...retiradasHoje ?? []]?.toSorted((a, b) => a.Date?.getTime() - b.Date?.getTime())

    useEffect(() => {
        async function getPedidos() {
            setEntregasHoje(await ListaPedidoEntregaHoje())
            setRetiradasHoje(await ListaPedidoRetiradaHoje())
        }
        getPedidos()
    }, [])

    return (
        <div className="border-2 rounded-xl">
            <div className="h-15 w-full ">

            </div>
            <div className="bg-[#F1F5F9]/30 grid grid-cols-6 border-2 h-10 w-full
        items-center px-5 text-center text-[#65758B] text-base font-medium
        ">
                <p>Pedido</p>
                <p>Cliente</p>
                <p>Tipo</p>
                <p>Total</p>
                <p>Status</p>
                <p>Observação</p>

            </div>
            {pedidosHoje.map(item => (
                <div className="h-19 w-full grid grid-cols-6 items-center text-center gap-3 px-6"
                    key={item.Id}
                >
                    <div>
                        <p className="text-[#0F1729] text-xl font-medium">{`#${item.Id}`}</p>

                    </div>
                    <div>
                        <p className="text-[#0F1729] text-xl">{item.Nome}</p>
                        <p className="text-[#65758B] text-sm"> {item.pedidos.length} itens</p>
                    </div>

                    <BadgeTipoAdmin text={'NomeRua' in item ?
                        "Entrega" :
                        "Retirada"
                    } />

                    <div>
                        <p className="text-[#0F1729] text-xl font-medium">R$ {
                            item.pedidos.map(x => x.Valor).reduce((acc, curr) => acc + curr, 0).toFixed(2)
                        } </p>
                    </div>

                    <BadgeStatusAdmin text={item.pedidos[0].Status} />

                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="bg-[#FACC14]/10 hover:bg-[#FACC14]/20 py-2 px-4 rounded-full 
                            text-[#FACC14] cursor-pointer font-medium border border-[#FACC14]/20 text-center
                                flex items-center justify-center
                            ">
                                <Eye size={20} />
                            </button>

                        </DialogTrigger>

                    </Dialog>


                </div>
            ))}

        </div>)
}