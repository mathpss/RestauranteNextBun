'use client'
import { Cardapio } from "@/Domain/Model/Cardapio"
import { CardapioServiceGet, CardapioServiceUpdate } from "@/Infrastructure/Service/CardapioService"
import { CircleCheckBig, Settings } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"

export function CardapioTableAdmin() {
    const [cardapio, setCardapio] = useState<Cardapio | null>(null)
    const mistura = cardapio?.Mistura.split(',').map(x => x.trim())
    const guarnicao = cardapio?.Guarnicao.split(',').map(x => x.trim())
    const [copiaCardapio, setCopiaCardapio] = useState<Cardapio | null>(null)
    const [isEditMistura, setIsEditMistura] = useState<boolean[]>([])
    const [isEditGuarnicao, setIsEditGuarnicao] = useState<boolean[]>([])

    useEffect(() => {
        const getCardapio = async () => {
            const result = await CardapioServiceGet()
            setCardapio(result)
            setCopiaCardapio(result)
            setIsEditMistura(Array(mistura?.length).fill(true))
            setIsEditGuarnicao(Array(guarnicao?.length).fill(true))
        }
        getCardapio()
    }, [mistura?.length, guarnicao?.length])

    function handleMistura(index: number) {
        setIsEditMistura(prev => prev.map((x, i) =>
            (i === index ? !x : x))
        )

    }
    function handleGuarnicao(index: number) {
        setIsEditGuarnicao(prev => prev.map((x, i) =>
            (i === index ? !x : x)))
    }

    function handleOnChangeMistura(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { value } = e.target

        setCardapio(prev => {
            if (!prev) return null;

            const itens = prev.Mistura.split(',');
            itens[index] = value;

            return {
                ...prev,
                Mistura: itens.join()
            };
        });
        // Primeira tentativa onde acabou dando errado
        // setCopiaMistura(cardapio!.Mistura.split(',').map((x, i) =>
        //     (i === mistura?.indexOf(name) ? value : x)
        // ))

        // setCardapio(prev => {
        //     if (!prev) return null
        //     return {
        //         ...prev,
        //         Mistura: copiaMistura.join()
        //     }
        // })
    }

    function handleOnChangeGuarnicao(e: ChangeEvent<HTMLInputElement>, index: number) {
        const { value } = e.target

        setCardapio(prev => {
            if (!prev) return null

            const itens = prev.Guarnicao.split(',')
            itens[index] = value

            return {
                ...prev,
                Guarnicao: itens.join()
            }
        })
    }

    function handleUpdateMistura(index: number) {
        async function updateMistura() {
            if (!cardapio) return;
            await CardapioServiceUpdate(cardapio)
        }
        updateMistura()
        setIsEditMistura(prev => prev.map((x, i) =>
            (i === index ? !x : x))
        )
        async function getAtomicidade() {
            const result = await CardapioServiceGet()
            setCardapio(result)
        }
        getAtomicidade()
    }

    function handleUpdateGuarnicao(index: number) {
        async function updateGuarnicao() {
            if (!cardapio) return;
            await CardapioServiceUpdate(cardapio)
        }
        updateGuarnicao()
        setIsEditGuarnicao(prev => prev.map((x, i) =>
            (i === index ? !x : x)
        ))
        async function getAtomicidade() {
            const result = await CardapioServiceGet()
            setCardapio(result)
        }
        getAtomicidade()
    }

    return (
        <div className="flex h-140 gap-6">
            <div className="border-2 rounded-xl w-[50%] h-full hover:shadow-2xl">
                <div className="h-15 w-full">
                    <h2 className="text-center text-[#0F1729] text-3xl font-medium py-3">
                        Mistura
                    </h2>
                </div>
                <div className="bg-[#F1F5F9]/30  border-t-2 h-[90%] w-full flex flex-col 
                justify-center-safe gap-6 items-center p-5 text-center text-[#65758B] 
                text-xl font-medium rounded-b-xl
                ">
                    {cardapio?.Mistura.split(',').map((item, index) => (
                        <div key={index} className="flex gap-3">
                            <input disabled={isEditMistura[index]} value={item} name={mistura![index]}
                                onChange={(e) => handleOnChangeMistura(e, index)}
                            />

                            {isEditMistura[index] ?
                                <button className="cursor-pointer hover:text-[#F97015]"
                                    onClick={() => handleMistura(index)}
                                >
                                    <Settings size={20} />
                                </button>
                                :
                                <button className="cursor-pointer text-[#21C45D]"
                                    onClick={() => handleUpdateMistura(index)}
                                >
                                    <CircleCheckBig size={20} className="text-[#21C45D]" />
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-2 rounded-xl w-[50%] h-full hover:shadow-2xl">
                <div className="h-15 w-full">
                    <h2 className="text-center text-[#0F1729] text-3xl font-medium py-3">
                        Guarnição
                    </h2>
                </div>
                <div className="bg-[#F1F5F9]/30  border-t-2 h-[90%] w-full flex flex-col 
                justify-center-safe gap-6 items-center p-5 text-center text-[#65758B] 
                text-xl font-medium rounded-b-xl
                ">
                    {cardapio?.Guarnicao.split(',').map((item, index) => (
                        <div key={index} className="flex gap-3">
                            <input disabled={isEditGuarnicao[index]} value={item} name={guarnicao![index]}
                                onChange={(e) => handleOnChangeGuarnicao(e, index)}
                            />

                            {isEditGuarnicao[index] ?
                                <button className="cursor-pointer hover:text-[#F97015]"
                                    onClick={() => handleGuarnicao(index)}
                                >
                                    <Settings size={20} />
                                </button>
                                :
                                <button className="cursor-pointer text-[#21C45D]"
                                    onClick={() => handleUpdateGuarnicao(index)}
                                >
                                    <CircleCheckBig size={20} className="text-[#21C45D]" />
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}