// Components imports
import AnimatedText from "@components/AnimatedText";
import Header from "@components/Header";

// Module imports
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Header/>
            <div className="flex flex-col flex-center gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <Image src="/images/logo.png"
                       alt="Carnaval de Monthey"
                       width={200} height={200}
                       className="drop-shadow-2xl xs:w-28  sm:w-48 md:w-60 lg:w-72 xl:w-80"
                />
                <AnimatedText text="Carnaval de Monthey" className="text-bouncy-gradient text-2xl max-w-prose
                xl:text-8xl lg:whitespace-nowrap lg:text-6xl md:text-5xl sm:text-3xl xs:text-xl"/>
            </div>

            <section className="flex-col flex-center bg-dark p-16">
                <h2 className="text-5xl text-bouncy font-bold text-snow text-center max-w-3xl">Le plus grand carnaval du Valais, ... et le meilleur du monde!</h2>

                <div className="flex-col flex-center gap-6 mt-12 text-snow">
                    <p className="max-w-4xl">Le carnaval de Monthey c’est 6 jours de folie et tradition ancestral. Du jeudi au mardi, masques, chars, « guggenmusik », et autres animations rythment le cœur de notre ville de Monthey.
                        Le  fameux cortège du dimanche, qui évoque les thèmes chauds de l{'\''}actualité locale, régionale ou internationale, attire quant à lui chaque année un large public</p>
                    <h3 className="text-3xl text-bouncy font-bold">... et, ce depuis plus de <span className="font-mono font-extrabold text-3xl">150</span> ans!</h3>
                </div>

                <div>
                    <h3 className="text-4xl text-bouncy font-bold text-snow text-center mt-12">Les dates du prochain carnaval</h3>
                    <button className="bg-yellow-600 text-bouncy text-dark text-2xl font-bold p-4 rounded-lg mt-6">Informations <span className="font-mono font-extrabold">2025</span></button>
                </div>

            </section>
        </>
    )
}
