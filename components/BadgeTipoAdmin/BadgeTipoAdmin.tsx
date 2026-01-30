import { IBadgeTipoAdmin } from "./interface";


export function BadgeTipoAdmin({text}:IBadgeTipoAdmin) {
    
    return (
        <div className={ text === "Entrega" ?
            "bg-[#F97015]/10 py-2 px-4 rounded-full text-[#F97015] text-center font-medium"
            :
            "bg-[#65758B]/10 py-2 px-4 rounded-full text-[#65758B] text-center font-medium"
        }
        >
            <p>{text}</p>
        </div>
    )
}