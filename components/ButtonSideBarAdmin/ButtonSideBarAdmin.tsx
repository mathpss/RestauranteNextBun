'use client'
import { IButtonSideBarAdmin } from "./interface";

export function ButtonSideBarAdmin({ icon, text, handleOnClick }: IButtonSideBarAdmin) {

    return (
        <button className="w-full h-10 items-center flex gap-3 cursor-pointer rounded-xl
            hover:bg-[#1D283A] text-[#94A3B8] hover:text-[#F8FAFC]
            focus:bg-[#1D283A] focus:text-[#F8FAFC]
            "
            onClick={handleOnClick}
        >
            <div className="w-1 h-6 bg-[#F97015] rounded-r-xl "></div>
            {icon}

            <p className="text-xl">{text}</p>
        </button>
    )
}