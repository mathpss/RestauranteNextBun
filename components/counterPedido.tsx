'use cliente'

import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"

type CounterPedidoProps = {
    count: number,
    counterPlus: (e: React.MouseEvent<HTMLButtonElement>) => void,
    counterLess: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function CounterPedido({ count, counterPlus, counterLess }: CounterPedidoProps) {
    
    return (
        <div className="flex items-center justify-center mb-1">
            <Button
                onClick={counterLess}
                className="bg-amber-400 text-white rounded-full h-10 w-10"
            >
                <Minus />
            </Button>
            <p className="h-10 w-10 text-center leading-10 text-black"  > {count}</p>
            <Button
                onClick={counterPlus}
                className="bg-amber-400 text-white rounded-full h-10 w-10"
            >
                <Plus />
            </Button>
        </div>
    )
}