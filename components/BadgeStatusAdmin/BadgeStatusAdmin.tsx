import { IBadgeStatusAdmin } from "./interface";


export function BadgeStatusAdmin({text}:IBadgeStatusAdmin) {
    return (
        <div className={ text === "Novo" ?
            "border-[#3C83F6]/20 bg-[#3C83F6]/10  text-[#3C83F6] py-2 px-4 rounded-full text-center font-medium border "
            : text === "Em Preparo" ?
                "border-[#FACC14]/20 bg-[#FACC14]/10  text-[#FACC14] py-2 px-4 rounded-full text-center font-medium border "
            : text === "Pronto" ?
                "border-[#21C45D]/20 bg-[#21C45D]/10  text-[#21C45D] py-2 px-4 rounded-full text-center font-medium border "    
            :
                "border-[#EF4343]/20 bg-[#EF4343]/10  text-[#EF4343] py-2 px-4 rounded-full text-center font-medium border "
        }
        >
            <p>{text}</p>
        </div>
    )
}