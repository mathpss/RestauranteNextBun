'use client'
import { CircleCheckBig, Clock, ShoppingBag } from "lucide-react";

export function CardResumeAdmin() {
    return (
        <div className=" grid grid-cols-4 gap-3">
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#F97015]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <ShoppingBag size={20} className="text-[#F97015]" />
                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> 47</p>
                    <p className="text-[#65758B] text-xl">Pedidos Hoje</p>
                </div>
            </div>
            <div className="border-2 h-40 rounded-xl p-5 flex flex-col gap-4 hover:shadow-md">
                <div className="w-10 h-10 bg-[#FACC14]/10 items-center justify-center flex
                rounded-xl 
                ">
                    <Clock size={20} className="text-[#FACC14]" />
                    
                </div>
                <div>
                    <p className="text-[#0F1729] text-3xl"> 8</p>
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
                    <p className="text-[#0F1729] text-3xl"> 5</p>
                    <p className="text-[#65758B] text-xl">Prontos</p>
                </div>
            </div>

        </div>
    )
}