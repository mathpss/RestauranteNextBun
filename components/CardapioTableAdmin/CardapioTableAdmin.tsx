'use client'

export function CardapioTableAdmin() {
    return (
        <div className="flex h-140 gap-6">
            <div className="border-2 rounded-xl w-[50%] h-full">
                <div className="h-15 w-full">
                    <h2 className="text-center text-[#0F1729] text-3xl font-medium py-3">
                        Mistura
                    </h2>
                </div>
                <div className="bg-[#F1F5F9]/30  border-t-2 h-[90%] w-full flex flex-col 
                justify-center-safe gap-6 items-center p-5 text-center text-[#65758B] 
                text-xl font-medium rounded-b-xl
                ">
                    <p>ovo frito</p>
                    <p>Carne ao molho</p>
                    <p>Frango Frito</p>
                    <p>costela do chefe</p>
                    <p>peixo ao molho</p>
                    <p>peixe frito</p>
                </div>
            </div>

            <div className="border-2 rounded-xl w-[50%] h-full">
                <div className="h-15 w-full">
                    <h2 className="text-center text-[#0F1729] text-3xl font-medium py-3">
                        Guarnição
                    </h2>
                </div>
                <div className="bg-[#F1F5F9]/30  border-t-2 h-[90%] w-full flex flex-col 
                justify-center-safe gap-6 items-center p-5 text-center text-[#65758B] 
                text-xl font-medium rounded-b-xl
                ">
                    <p>salada do chefe</p>
                    <p>purê de batata </p>
                    <p>Farofa</p>
                    <p>Mandioca frita</p>
                    <p>Batata rústica</p>
                    <p>Legume Assado</p>
                </div>
            </div>
        </div>
    )
}