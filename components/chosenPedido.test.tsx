/// <reference lib="dom" />

import { expect, test, describe, mock, afterEach } from "bun:test";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ChosenPedido } from "./chosenPedido";
import "@testing-library/jest-dom/vitest";

describe("ChosenPedido", () => {
      afterEach(() => {
          cleanup();
      });
  
  test("deve renderizar os três botões de tamanho com os textos corretos", () => {
    render(
      <ChosenPedido 
        pushPedidoSizeP={() => {}} 
        pushPedidoSizeM={() => {}} 
        pushPedidoSizeG={() => {}} 
      />
    );

    expect(screen.getByText(/Tamano: P/i)).toBeInTheDocument();
    expect(screen.getByText(/Tamano: M/i)).toBeInTheDocument();
    expect(screen.getByText(/Tamano: G/i)).toBeInTheDocument();
  });

  test("deve chamar pushPedidoSizeP quando o botão P for clicado", () => {
    const spyP = mock(() => {});
    render(
      <ChosenPedido 
        pushPedidoSizeP={spyP} 
        pushPedidoSizeM={() => {}} 
        pushPedidoSizeG={() => {}} 
      />
    );

    const buttonP = screen.getByText(/Tamano: P/i);
    fireEvent.click(buttonP);

    expect(spyP).toHaveBeenCalledTimes(1);
  });

  test("deve chamar pushPedidoSizeM quando o botão M for clicado", () => {
    const spyM = mock(() => {});
    render(
      <ChosenPedido 
        pushPedidoSizeP={() => {}} 
        pushPedidoSizeM={spyM} 
        pushPedidoSizeG={() => {}} 
      />
    );

    const buttonM = screen.getByText(/Tamano: M/i);
    fireEvent.click(buttonM);

    expect(spyM).toHaveBeenCalledTimes(1);
  });

  test("deve chamar pushPedidoSizeG quando o botão G for clicado", () => {
    const spyG = mock(() => {});
    render(
      <ChosenPedido 
        pushPedidoSizeP={() => {}} 
        pushPedidoSizeM={() => {}} 
        pushPedidoSizeG={spyG} 
      />
    );

    const buttonG = screen.getByText(/Tamano: G/i);
    fireEvent.click(buttonG);

    expect(spyG).toHaveBeenCalledTimes(1);
  });
});