'use client';
import { createContext, useState, ReactNode } from 'react';
import { IPedidoContext, Pedido } from './types';

export const PedidoContext = createContext<IPedidoContext>({} as IPedidoContext)

export function PedidoProvider({ children }: { children: ReactNode }) {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    return (
        <PedidoContext.Provider value={{ pedidos, setPedidos }}>
            {children}
        </PedidoContext.Provider>
    )
}