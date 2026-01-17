'use client'
import { useContext } from "react"
import { PedidoContext } from "./pedidoContext";

export const usePedido = () => {
    const context = useContext(PedidoContext);
    if (!context) throw new Error('usePedido deve ser usado dentro de um PedidoProvider');
    return context;
};