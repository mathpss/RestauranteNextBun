'use cliente'

import { Minus, Plus } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type CounterPedidoProps = {
    count: number,
    counterPlus: (e: React.MouseEvent<HTMLButtonElement>) => void,
    counterLess: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function CounterPedido({ count, counterPlus, counterLess }: CounterPedidoProps) {
    
    return (
        <div className="flex">
            <Button
                onClick={counterLess}
                className="bg-amber-400 text-white rounded-full h-10 w-10"
            >
                <Minus />
            </Button>
            <Input disabled className="h-10 w-10 text-center text-black" value={count} />
            <Button
                onClick={counterPlus}
                className="bg-amber-400 text-white rounded-full h-10 w-10"
            >
                <Plus />
            </Button>
        </div>
    )
}