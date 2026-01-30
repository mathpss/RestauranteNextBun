'use client'

import { BadgeStatusAdmin } from "../BadgeStatusAdmin/BadgeStatusAdmin";
import { BadgeTipoAdmin } from "../BadgeTipoAdmin/BadgeTipoAdmin";

export function PedidosTableAdmin() {

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
                <p>Ações</p>

            </div>
            <div className="h-19 w-full grid grid-cols-6 items-center text-center gap-3 px-6">
                <div>
                    <p className="text-[#0F1729] text-xl font-medium">#1040</p>
                    <p className="text-[#65758B] text-sm">há 15 minutos</p>
                </div>
                <div>
                    <p className="text-[#0F1729] text-xl">Maria</p>
                    <p className="text-[#65758B] text-sm">15 itens</p>
                </div>

                <BadgeTipoAdmin text="Entrega" />

                <div>
                    <p className="text-[#0F1729] text-xl font-medium">R$ 120,00</p>
                </div>

                <BadgeStatusAdmin text="Novo" />

                <button className="bg-[#FACC14]/10 hover:bg-[#FACC14]/20 py-2 px-4 rounded-full 
            text-[#FACC14] cursor-pointer font-medium border border-[#FACC14]/20
                ">
                    Avançar
                </button>

            </div>

        </div>)
}