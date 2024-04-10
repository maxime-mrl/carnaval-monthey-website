// Components imports
import AnimatedText from "@components/AnimatedText";
import Header from "@components/Header";
import {Button} from "@components/ui/button";

// Module imports
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@node_modules/@fortawesome/react-fontawesome";
import {faInstagram, faSquareFacebook} from "@node_modules/@fortawesome/free-brands-svg-icons";

// Assets imports
import prince from "@public/images/prince2024.png";
import newspaper from "@public/images/journal.png";
import {MovingCards} from "@components/MovingCards";

export default function Home() {
    const sponsors = [
        {src: "/images/sponsors/1.png", alt: "Logo sponsor 1"},
        {src: "/images/sponsors/2.png", alt: "Logo sponsor 2"},
        {src: "/images/sponsors/3.png", alt: "Logo sponsor 3"},
        {src: "/images/sponsors/4.png", alt: "Logo sponsor 4"},
        {src: "/images/sponsors/5.png", alt: "Logo sponsor 5"},
    ];

    return (
        <>
            {/* Header component */}
            <Header/>
            <div
                className="flex flex-col flex-center gap-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <Image src="/images/logo.png"
                       alt="Carnaval de Monthey"
                       width={200} height={200}
                       className="w-80 drop-shadow-2xl xs:w-28 sm:w-48 md:w-60 lg:w-64 xl:w-72"
                />
                <AnimatedText text="Carnaval de Monthey" className="text-bouncy-gradient text-8xl whitespace-nowrap max-w-prose
                xs:whitespace-pre-wrap sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"/>
            </div>

            {/* Teaser Section */}
            <section className="flex-col flex-center bg-dark p-16">
                <h2 className="text-5xl text-bouncy font-bold text-snow text-center max-w-3xl mt-12">Le plus grand
                    carnaval du Valais, ... et le meilleur du monde!</h2>

                <div className="flex-col flex-center gap-6 my-12 text-snow">
                    <p className="max-w-4xl">Le carnaval de Monthey c&apos;est 6 jours de folie et tradition ancestral. Du
                        jeudi au mardi, masques, chars, « guggenmusik », et autres animations rythment le cœur de notre
                        ville de Monthey.
                        Le fameux cortège du dimanche, qui évoque les thèmes chauds de l{'\''}actualité locale,
                        régionale ou internationale, attire quant à lui chaque année un large public</p>
                    <h3 className="text-3xl text-bouncy font-bold">... et, ce depuis plus de <span
                        className="font-mono font-extrabold text-3xl">150</span> ans!</h3>
                </div>

                <div className="flex-col flex-center text-snow gap-16">
                    <h3 className="text-4xl text-bouncy font-bold text-snow text-center mt-12">Qu&apos;est ce que t&apos;attends
                        pour venir?</h3>
                    <Link href="/infos">
                        <Button variant="custom"
                                className="text-bouncy-shadow text-2xl p-6">Informations <span
                            className="font-mono font-extrabold ml-1">2025</span></Button>
                    </Link>
                </div>
            </section>

            {/* Information Section */}
            <section className="max-h-screen flex justify-center items-stretch bg-gradient-to-br from-white to-yellow-500/60 px-16 gap-16 py-20">
                <div className="w-[40%] max-w-3xl flex-col flex-center gap-8 p-8 text-dark text-left bg-white border-1 rounded-lg drop-shadow-2xl 2xl:max-w-4xl">
                    <h3 className="text-4xl text-bouncy font-bold text-dark self-start">Le Prince</h3>
                    <p className="max-w-2xl font-semibold self-start">La tradition est de nommer tous les ans un prince ou une princesse qui
                        représentera le carnaval et notre ville pour chaque édition. Nous nous souviendrons en tout
                        temps de sa grandeur et bonté. </p>
                    <h3 className="text-4xl text-bouncy font-bold text-dark self-start">Edition<span className="font-mono font-extrabold"> 2024</span> : </h3>
                    <Image src={prince} alt="Portrait de Christophe 1er"
                                className="w-1/2"
                    />
                    <p className="max-w-2xl font-semibold self-start">Arrivé à Monthey le jour de sa naissance, Christophe 1er devient résolument actif dans à peu près tout ce que fait notre cité.
                        s&apos;engage tout petit dans les scouts, mais pas juste le petit scout. Il devient président des anciens!
                        Il commence ses activité canavalesque comme constructeur de chars en 1985, puis rejoint les rangs du Bout&apos;Rions.
                        Aujourd&apos;hui, le voilà hissé au rôle d&apos;acteur principal de notre Carnaval. Longue vie à CHRISTOPHE 1er !!!</p>
                </div>

                <div className="w-[40%] max-w-3xl flex-col flex-center gap-6 p-12 text-white bg-white border-1 rounded-lg drop-shadow-2xl 2xl:max-w-4xl">
                    <h3 className="text-4xl text-bouncy font-bold text-dark">Notre Journal</h3>
                    <Image src={newspaper} alt="Journal du Carnaval"
                           className="max-w-full max-h-[85%] object-contain"/>
                    <Link href="/newspaper">
                        <Button variant="custom"
                                className="text-white text-bouncy-shadow text-2xl p-6">Plus d&apos;Info</Button>
                    </Link>
                </div>
            </section>

            {/* Media Section */}
            <section className="max-h-screen flex-col flex-center gap-6 bg-white p-16">
                <h3 className="text-4xl text-bouncy font-semibold text-black text-center">Nos Sponsors</h3>
                <p className="max-w-2xl">Ils soutiennent notre carnaval, nous permettant de refaire des éditions chaque
                    année.</p>
                <p className="font-medium">Un grand MERCI !!</p>
                <MovingCards
                    items={sponsors}
                    direction={"forwards"}
                    speed={30}
                />

                <h3 className="text-5xl text-bouncy font-semibold text-black text-center">Suis nous sur les réseaux</h3>
                <span className="flex gap-10 my-12">
                    <a className="hover:scale-90 text-red-900" href="https://www.instagram.com/carnavaldemonthey/"><FontAwesomeIcon
                        className="w-24 h-24" icon={faInstagram}/></a>
                    <a className="hover:scale-90" href="https://fr-fr.facebook.com/Carnavaldemonthey/"><FontAwesomeIcon
                        className="w-24 h-24 text-red-900" icon={faSquareFacebook}/></a>
                </span>

            </section>
        </>
    )
}
