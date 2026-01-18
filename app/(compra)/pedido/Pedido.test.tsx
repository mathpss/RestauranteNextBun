import { describe, test, expect, mock, afterEach } from "bun:test"
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom/vitest';
import PedidoPage from "./page";

const mockSetPedidos = mock(() => {});
mock.module("@/app/_context/_pedidosProvider/usePedidos", () => ({
    usePedido: () => ({
        pedidos: [],
        setPedidos: mockSetPedidos
    })
}));

// 2. Mock do Serviço de Cardápio
mock.module("@/Infrastructure/Service/CardapioService", () => ({
    CardapioServiceGet: async () => ({
        Mistura: "Frango, Carne",
        Guarnicao: "Arroz, Feijão"
    })
}));

describe("Componente Pedido (Página)", () => {
    afterEach(() => {
        cleanup();
        mockSetPedidos.mockClear();
    });

    test("deve carregar o cardápio e exibir as opções", async () => {
        render(<PedidoPage />);

        // Como o carregamento está no useEffect, usamos waitFor
        await waitFor(() => {
            expect(screen.getByText("Frango")).toBeInTheDocument();
            expect(screen.getByText("Arroz")).toBeInTheDocument();
        });
    });

    test("deve incrementar o contador de mistura ao clicar no botão de soma", async () => {
        render(<PedidoPage />);
        
        await waitFor(() => screen.getByText("Frango"));

        // O CounterPedido tem um Input. Buscamos o primeiro input (Mistura)
        const inputs = screen.getAllByRole("textbox");
        const buttonsPlus = screen.getAllByRole("button"); 
        
        // Localizar o botão de soma da Mistura (baseado na estrutura do seu CounterPedido)
        // No seu CounterPedido, o botão de soma é o segundo botão de cada linha
        fireEvent.click(buttonsPlus[2]); // Índice depende da ordem de renderização (ShoppingCart é o primeiro)

        expect(inputs[0]).toHaveValue("1");
    });

    test("não deve permitir adicionar mais de 2 misturas (regra de negócio)", async () => {
        render(<PedidoPage />);
        await waitFor(() => screen.getByText("Frango"));

        const buttonsPlus = screen.getAllByRole("button");
        const inputFrango = screen.getAllByRole("textbox")[0];

        // Tenta clicar 3 vezes no "Frango" (índice do botão precisa ser mapeado com cuidado)
        // Nota: O ShoppingCart é o índice 0. O botão Less da mistura é 1, Plus é 2.
        fireEvent.click(buttonsPlus[2]);
        fireEvent.click(buttonsPlus[2]);
        fireEvent.click(buttonsPlus[2]);

        // O checker > 1 bloqueia o terceiro incremento
        expect(inputFrango).toHaveValue("2");
    });

    test("deve adicionar pedido ao carrinho e limpar os contadores", async () => {
        render(<PedidoPage />);
        await waitFor(() => screen.getByText("Frango"));

        // Seleciona uma mistura
        const buttonsPlus = screen.getAllByRole("button");
        fireEvent.click(buttonsPlus[2]); // Adiciona 1 Frango

        // Clica no botão de tamanho P (ChosenPedido)
        const btnTamanhoP = screen.getByText(/Tamano: P/i);
        fireEvent.click(btnTamanhoP);

        // Verifica se o contador do carrinho no ShoppingCart atualizou
        const cartCounter = screen.getByText("1");
        expect(cartCounter).toBeInTheDocument();

        // Verifica se chamou o contexto global
        expect(mockSetPedidos).toHaveBeenCalled();
    });
});