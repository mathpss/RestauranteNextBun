'use client'

import { PedidoEntrega } from "@/Domain/Model/PedidoEntrega"
import { PedidoRetirada } from "@/Domain/Model/PedidoRetirada"
import { PedidoEntregaEmPreparoHoje, PedidoEntregaNovosHoje, PedidoEntregaProntosHoje, UpdateEntregaService } from "@/Infrastructure/Service/PedidoEntregaService"
import { PedidosRetiradasEmPreparoHoje, PedidosRetiradasNovosHoje, PedidosRetiradasProntosHoje, UpdateRetiradaService } from "@/Infrastructure/Service/PedidoRetiradaService"
import { useEffect, useState } from "react"
import { CardsModoCozinhaNovos } from "../CardsModoCozinhaNovos/CardsModoCozinhaNovos"
import { CardsModoCozinhaPreparo } from "../CardsModoCozinhaPreparo/CardsModoCozinhaPreparo"
import { CardsModoCozinhaProntos } from "../CardsModoCozinhaProntos/CardsModoCozinhaProntos"

export function ModoCozinhaAdmin() {

    const [entregaNovosHoje, setEntregaNovosHoje] = useState<PedidoEntrega[] | null>(null)
    const [entregaEmPreparoHoje, setEntregaEmPreparoHoje] = useState<PedidoEntrega[] | null>(null)
    const [entregaProntosHoje, setEntregaProntosHoje] = useState<PedidoEntrega[] | null>(null)

    const [retiradasNovosHoje, setRetiradasNovosHoje] = useState<PedidoRetirada[] | null>(null)
    const [retiradasEmPreparoHoje, setRetiradasEmPreparoHoje] = useState<PedidoRetirada[] | null>(null)
    const [retiradasProntosHoje, setRetiradasProntosHoje] = useState<PedidoRetirada[] | null>(null)

    useEffect(() => {
        async function getPedidosHoje() {
            setEntregaNovosHoje(await PedidoEntregaNovosHoje())
            setEntregaEmPreparoHoje(await PedidoEntregaEmPreparoHoje())
            setEntregaProntosHoje(await PedidoEntregaProntosHoje())

            setRetiradasNovosHoje(await PedidosRetiradasNovosHoje())
            setRetiradasEmPreparoHoje(await PedidosRetiradasEmPreparoHoje())
            setRetiradasProntosHoje(await PedidosRetiradasProntosHoje())
        }
        getPedidosHoje()

    }, [])

    function handleUpdateRetirada(pedidoRetirada: PedidoRetirada) {

        const copiaRetirada: PedidoRetirada = {
            ...pedidoRetirada,
            pedidos: pedidoRetirada.pedidos.map(pedidos => ({ ...pedidos, Status: "Em Preparo" }))
        }

        async function updateRetiradaAsync() {
            await UpdateRetiradaService(copiaRetirada)
            setRetiradasNovosHoje(await PedidosRetiradasNovosHoje())

        }
        updateRetiradaAsync()
    }

    function handleUpdateEntrega(pedidoEntrega: PedidoEntrega) {

        const copiaEntrega: PedidoEntrega = {
            ...pedidoEntrega,
            pedidos: pedidoEntrega.pedidos.map(pedidos => ({ ...pedidos, Status: "Em Preparo" }))
        }

        async function updateEntregaAsync() {
            await UpdateEntregaService(copiaEntrega)
            setEntregaNovosHoje(await PedidoEntregaNovosHoje())

        }
        updateEntregaAsync()
    }

    function handleUpdateEmPreparoRetirada(pedidoRetirada: PedidoRetirada) {

        const copiaRetirada: PedidoRetirada = {
            ...pedidoRetirada,
            pedidos: pedidoRetirada.pedidos.map(pedidos => ({ ...pedidos, Status: "Prontos" }))
        }
        async function updateRetiradaAsync() {
            await UpdateRetiradaService(copiaRetirada)
            setRetiradasEmPreparoHoje(await PedidosRetiradasEmPreparoHoje())
        }
        updateRetiradaAsync()

    }

    function handleUpdateEmPreparoEntrega(pedidoEntrega: PedidoEntrega) {
        const copiaEntrega: PedidoEntrega = {
            ...pedidoEntrega,
            pedidos: pedidoEntrega.pedidos.map(pedidos => ({ ...pedidos, Status: "Prontos" }))
        }
        async function updateEntregaAsync() {
            await UpdateEntregaService(copiaEntrega)
            setEntregaEmPreparoHoje(await PedidoEntregaEmPreparoHoje())
        }
        updateEntregaAsync()
    }

    return (
        <div className="w-full h-full grid grid-cols-3 gap-3">
            <div className="border border-[#3C8CF6]/20 rounded-3xl">
                <div className="flex justify-between items-center px-6 bg-[#3C8CF6]/10 
                text-2xl  text-[#3C8CF6] font-medium h-15 rounded-t-3xl
                ">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-[#3C8CF6] rounded-full " />
                        <p>
                            Novos
                        </p>

                    </div>

                    <p className="bg-[#3C8CF6]/10 rounded-full h-10 w-10 text-xl justify-center items-center flex">
                        {!!retiradasNovosHoje && !!entregaNovosHoje &&
                            retiradasNovosHoje?.length + entregaNovosHoje?.length
                        }
                    </p>

                </div>
                <div className="flex flex-col p-3 gap-3 justify-center">

                    {entregaNovosHoje?.map((item, index) => (

                        <CardsModoCozinhaNovos key={index} retiradaEntrega={item} handleUpdate={() => handleUpdateEntrega(item)} />

                    ))}

                    {retiradasNovosHoje?.map((item, index) => (

                        <CardsModoCozinhaNovos key={index} retiradaEntrega={item} handleUpdate={() => handleUpdateRetirada(item)} />

                    ))}
                </div>

            </div>

            <div className="border border-[#FACC14]/20 rounded-3xl">
                <div className="flex justify-between items-center px-6 bg-[#FACC14]/10 
                text-2xl  text-[#FACC14] font-medium h-15 rounded-t-3xl
                ">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-[#FACC14] rounded-full " />
                        <p>
                            Em preparo
                        </p>

                    </div>

                    <p className="bg-[#FACC14]/10 rounded-full h-10 w-10 text-xl justify-center items-center flex">
                        {!!retiradasEmPreparoHoje && !!entregaEmPreparoHoje &&
                            retiradasEmPreparoHoje?.length + entregaEmPreparoHoje?.length
                        }
                    </p>

                </div>
                <div className="flex flex-col p-3 gap-3 justify-center">
                    {entregaEmPreparoHoje?.map((item, index) => (
                        <CardsModoCozinhaPreparo key={index} retiradaEntrega={item} handleUpdate={() => handleUpdateEmPreparoEntrega(item)} />
                    ))}

                    {retiradasEmPreparoHoje?.map((item, index) => (
                        <CardsModoCozinhaPreparo key={index} retiradaEntrega={item} handleUpdate={() => handleUpdateEmPreparoRetirada(item)} />
                    ))}

                </div>

            </div>

            <div className="border border-[#21C45D]/20 rounded-3xl">
                <div className="flex justify-between items-center px-6 bg-[#21C45D]/10 
                text-2xl  text-[#21C45D] font-medium h-15 rounded-t-3xl
                ">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-[#21C45D] rounded-full " />
                        <p>
                            Prontos
                        </p>

                    </div>

                    <p className="bg-[#21C45D]/10 rounded-full h-10 w-10 text-xl justify-center items-center flex">
                        {!!retiradasProntosHoje && !!entregaProntosHoje &&
                            entregaProntosHoje?.length + retiradasProntosHoje?.length
                        }
                    </p>

                </div>
                <div className="flex flex-col p-3 gap-3 justify-center">

                    {entregaProntosHoje?.map(item => (
                        <CardsModoCozinhaProntos key={item.Id} retiradaEntrega={item} />
                    ))}

                    {retiradasProntosHoje?.map(item => (
                        <CardsModoCozinhaProntos key={item.Id} retiradaEntrega={item} />
                    ))}

                </div>

            </div>
        </div>

    )
}