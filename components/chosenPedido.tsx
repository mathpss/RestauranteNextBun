'use client'
import { Button } from "./ui/button";

type ChosenPedidoProps = {
    pushPedidoSizeP: (e: React.MouseEvent<HTMLButtonElement>)=>void
    pushPedidoSizeM: (e: React.MouseEvent<HTMLButtonElement>)=>void
    pushPedidoSizeG: (e: React.MouseEvent<HTMLButtonElement>)=>void
}

export function ChosenPedido({pushPedidoSizeP, pushPedidoSizeM, pushPedidoSizeG}:ChosenPedidoProps) {
    
    return (
        <div className="flex my-4 gap-4">
                <Button onClick={pushPedidoSizeP} className="bg-amber-400">Tamano: P</Button>
                <Button onClick={pushPedidoSizeM} className="bg-amber-400">Tamano: M</Button>
                <Button onClick={pushPedidoSizeG} className="bg-amber-400">Tamano: G</Button>
            </div>
    )
}