/// <reference lib="dom" />

import { describe, test, expect, vi, mock, afterEach } from "bun:test"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import '@testing-library/jest-dom/vitest';
import { CounterPedido } from "./counterPedido";

describe('CounterPedido', () => {

    afterEach(() => {
        cleanup();
    });

    test("deve renderizar o valor do contador no input desabilitado", () => {
        render(
            <CounterPedido
                count={5}
                counterPlus={vi.fn()}
                counterLess={vi.fn()}
            />
        )

        const input = screen.getByDisplayValue("5")

        expect(input).toHaveValue("5")
        expect(input).toBeDisabled()

    })

    test("deve chamar a função counterPlus ao clicar no botão de soma", () => {
        const spyPlus = mock(() => { });

        render(
            <CounterPedido
                count={0}
                counterPlus={spyPlus}
                counterLess={() => { }}
            />
        );

        // O ícone Plus está dentro do segundo botão
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[1]);

        expect(spyPlus).toHaveBeenCalledTimes(1);
    });

    test("deve chamar a função counterLess ao clicar no botão de menos", () => {
        const spyLess = mock(() => { });

        render(
            <CounterPedido
                count={10}
                counterPlus={() => { }}
                counterLess={spyLess}
            />
        );

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);

        expect(spyLess).toHaveBeenCalledTimes(1);
    });

})