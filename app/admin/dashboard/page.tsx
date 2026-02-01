'use client'
import { CardapioTableAdmin } from "@/components/CardapioTableAdmin/CardapioTableAdmin"
import { CardResumeAdmin } from "@/components/CardResumeAdmin/CardResumeAdmin"
import { PedidosTableAdmin } from "@/components/PedidosTableAdmin/PedidosTableAdmin"
import { SideBarAdmin } from "@/components/sideBarAdmin/sideBarAdmin"
import { Search } from "lucide-react"
import { ModoCozinhaAdmin } from "@/components/ModoCozinhaAdmin/ModoCozinhaAdmin"
import { useState } from "react"

export default function AdminLogin() {
    const [isDashboard, setIsDashboard] = useState(true)
    const [isCardapio, setIsCardapio] = useState(false)
    const [isCozinha, setIsCozinha] = useState(false)

    function handleIsDashboard() {
        setIsDashboard(true)
        setIsCardapio(false)
        setIsCozinha(false)
    }
    function handleIsCardapio() {
        setIsDashboard(false)
        setIsCardapio(true)
        setIsCozinha(false)
    }
    function handleIsCozinha() {
        setIsDashboard(false)
        setIsCardapio(false)
        setIsCozinha(true)
    }

    return (<>
        <div className="flex">
            <SideBarAdmin handleIsDashboard={handleIsDashboard}
                handleIsCardapio={handleIsCardapio}
                handleIsCozinha={handleIsCozinha}
            />
            <div className="w-full h-dvh">
                <header className="h-16 w-full items-center flex justify-between px-6 
                border-b-2 sticky
                ">
                    <div className="flex gap-3 h-10 w-md rounded-xl border-2 items-center px-3
                    bg-[#F8FAFC]
                    ">
                        <Search size={20} />
                        <input className="flex-1 border-0" placeholder="Buscar pedido" >

                        </input>
                    </div>
                    <button className="bg-[#21C45D]/10 hover:bg-[#21C45D]/20 py-2 px-4 rounded-full 
                    flex items-center text-[#21C45D] gap-2 cursor-pointer
                    ">
                        <span className="h-2 w-2 bg-[#21C45D] rounded-full " />
                        Aberto
                    </button>
                </header>
                <main className="w-full p-6 flex flex-col gap-3">
                    {!!isDashboard &&
                        <>
                            <CardResumeAdmin />
                            <PedidosTableAdmin />

                        </>
                    }
                    {
                        !!isCardapio && <CardapioTableAdmin />
                    }
                    {
                        !!isCozinha && <ModoCozinhaAdmin />
                    }
                </main>
            </div>
        </div>
    </>)
}