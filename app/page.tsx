import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CardapioServiceGet } from "@/Infrastructure/Service/CardapioService";
import Link from "next/link";

const result = await CardapioServiceGet()

export default async function Home() {

  const mistura = result.Mistura.split(',').map(x => x.trim())
  const guarnicao = result.Guarnicao.split(',').map(x => x.trim())
  return (
    <main className='flex justify-center items-center 
    bg-[url(/images/prato.jpg)] 
    min-h-dvh h-full w-full'
    >
      <Card className="h-auto min-w-[70%] bg-transparent backdrop-blur-2xl ">
        <CardHeader>
          <CardTitle className="text-center text-amber-400 text-5xl whitespace-nowrap">
            Cardápio do dia
          </CardTitle>

        </CardHeader>
        <CardContent className="text-center text-gray-900 text-xl">
          <p className="text-center text-amber-400 text-3xl mb-3">Misturas (2 opções)</p>
          {mistura.map((item, index) => (
            <div className="border-b-2 mb-3" key={index}> {item} </div>
          ))}
          <p className="text-center text-amber-400 text-3xl mb-3">Guarnições (3 opções)</p>
          {guarnicao.map((item, index) => (
            <div className="border-b-2 mb-3" key={index}> {item} </div>
          ))}
        </CardContent>

      </Card>

      <Link className="bg-amber-400 absolute right-2 bottom-4
       text-white text-xl px-4 py-2 rounded-xl hover:bg-amber-400/90"
        href={"/pedido"}

      >Montar Pedido
      </Link>

    </main>
  );
}
