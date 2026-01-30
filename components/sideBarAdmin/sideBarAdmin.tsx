'use client'
import { ChefHat, LayoutDashboard, UtensilsCrossed } from "lucide-react";
import { ButtonSideBarAdmin } from "../ButtonSideBarAdmin/ButtonSideBarAdmin";
import { ISideBarAdmin } from "./interface";

export function SideBarAdmin({handleIsDashboard, handleIsCardapio, handleIsCozinha}:ISideBarAdmin) {
    return (
        <section className="h-dvh w-[20%] bg-[#0F1729] flex flex-col items-center ">
            <div className="h-[10%] w-full flex items-center px-6 gap-3">
                <div className="w-10 h-10 bg-[#F97015] items-center justify-center flex
            rounded-xl
            ">
                    <UtensilsCrossed size={20} className="text-white" />
                </div>
                <div>
                    <p className="text-white text-xl">
                        Gestão de Pedidos
                    </p>
                </div>
            </div>

            <div className="h-full w-full flex flex-col px-3 gap-2 mt-3">
                <ButtonSideBarAdmin handleOnClick={handleIsDashboard} icon={<LayoutDashboard size={20} />} text='Dashboard' />
                <ButtonSideBarAdmin handleOnClick={handleIsCardapio} icon={<UtensilsCrossed size={20} />} text='Cardápio' />
                <ButtonSideBarAdmin handleOnClick={handleIsCozinha} icon={<ChefHat size={20} />} text='Modo Cozinha' />
            </div>



        </section>
    )
}