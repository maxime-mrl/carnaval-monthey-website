import AnimatedText from "@components/AnimatedText";
import Header from "@components/Header";
import Image from "next/image";
import { ChevronDown } from 'lucide-react';

export default function Home() {
    return (
        <>
            <Header/>
            <div className="flex flex-col flex-center gap-6">
                <Image src="/images/logo.png"
                       alt="Carnaval de Monthey"
                       width={200} height={200}
                       className="drop-shadow-2xl xs:w-28  sm:w-48 md:w-60 lg:w-72 xl:w-80"
                />
                <AnimatedText text="Carnaval de Monthey" className="uppercase text-bouncy-gradient text-2xl
                xl:text-8xl lg:text-6xl md:text-5xl sm:text-3xl xs:text-xl"/>
            </div>
        </>
    )
}
