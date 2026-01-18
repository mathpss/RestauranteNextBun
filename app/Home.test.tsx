import { expect, test, describe, mock, afterEach } from "bun:test";
import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import Home from "./page"; 

// 1. Mock do Serviço de Infraestrutura
mock.module("@/Infrastructure/Service/CardapioService", () => ({
    CardapioServiceGet: async () => ({
        Mistura: "Frango Assado, Bife Acebolado",
        Guarnicao: "Arroz, Feijão, Batata Frita"
    })
}));



describe("Página Home (Cardápio)", () => {

    afterEach(() => {
        cleanup();
    });

    test("deve renderizar o título e os itens do cardápio mockados", async () => {
        // Como a página é um componente assíncrono (Server Component), 
        // precisamos aguardar a resolução do JSX
        const PageJSX = await Home();
        render(PageJSX);

        // Verifica Título
        expect(screen.getByText(/Cardápio do dia/i)).toBeInTheDocument();

        // Verifica itens da Mistura (split por vírgula no componente)
        expect(screen.getByText("Frango Assado")).toBeInTheDocument();
        expect(screen.getByText("Bife Acebolado")).toBeInTheDocument();

        // Verifica itens da Guarnição
        expect(screen.getByText("Arroz")).toBeInTheDocument();
        expect(screen.getByText("Feijão")).toBeInTheDocument();
    });

    test("deve conter o link para montar pedido com o href correto", async () => {
        const PageJSX = await Home();
        render(PageJSX);

        const link = screen.getByRole("link", { name: /Montar Pedido/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "/pedido"); // se os testes futuros der problema voltar aqui para observar
    });

    test("deve exibir os cabeçalhos das seções", async () => {
        const PageJSX = await Home();
        render(PageJSX);

        expect(screen.getByText(/Misturas \(2 opções\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Guarnições \(3 opções\)/i)).toBeInTheDocument();
    });
});