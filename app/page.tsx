// Components imports
import { Button } from "@components/ui/button";

// Module imports
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faInstagram, faSquareFacebook } from "@node_modules/@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

// Assets imports
import prince from "@public/images/prince2024.png";
import newspaper from "@public/images/journal.png";
import { MovingCards } from "@components/MovingCards";
import { getSponsors } from "@utils/getSponsors";
import { ChevronDown } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
    const sponsors = await getSponsors()
    return (
        <>
            {/* Header component */}
            <header className="w-full h-dvh relative bg-[url('/images/monthey.jpg')] bg-cover">
                {/* Gradient */}
                <div className="absolute top-0 z-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-yellow-600 to-red-900 opacity-50"/> 
                <div className="z-1 relative h-full">
                    <div className="h-full flex-col flex-center gap-6 drop-shadow-3xl">
                        <Image src="/images/logo.png"
                            alt="Carnaval de Monthey"
                            width={200} height={200}
                            className="w-80
                            sm:w-48 md:w-60 xl:w-72"
                        />
                        <h1 className="h1 text-gradient text-center">Carnaval de Monthey</h1>
                    </div>
                    <Link href="#about" className="absolute w-full bottom-[3vh] flex justify-center">
                        <FontAwesomeIcon className="h-24 w-24 text-white cursor-pointer animate-bounce" icon={faAngleDown}/>
                    </Link>
                </div>
            </header>

            {/* Teaser Section */}
            <div className="bg-dark">
                <section className="flex-col flex-center container-size full-height gap-12 py-16" id="about">
                    <h2 className="h2 text-snow text-center max-w-3xl">
                        Le plus grand carnaval du Valais, et le meilleur du monde!
                    </h2>
                    <article className="flex-col flex-center gap-6 text-snow max-w-3xl">
                        <p>
                            Le carnaval de Monthey c&apos;est 6 jours de folie et tradition ancestral. Du jeudi au mardi, masques, chars, « guggenmusik », et autres animations rythment le cœur de notre ville de Monthey. Le fameux cortège du  régionale ou internationale, attire quant à lui chaque année un large public
                        </p>
                        <h3 className="h3 w-full">
                            ... et, ce depuis plus de
                            <span className="font-mono font-extrabold text-3xl">&nbsp;150&nbsp;</span>
                            ans!
                        </h3>
                    </article>

                    <article className="flex-col flex-center text-snow gap-16">
                        <h3 className="h3 text-center">
                            Qu&apos;est ce que t&apos;attends pour venir?
                        </h3>
                        <Link href="/infos">
                            <Button variant="custom" className="text-snow custom-shadow h4 p-6">
                                Informations
                                <span className="font-mono font-extrabold ml-1">
                                    2025
                                </span>
                            </Button>
                        </Link>
                    </article>
                </section>
            </div>

            {/* Information Section */}
            <div className="bg-gradient-to-br from-snow to-arylide">
                <section className="flex justify-center items-stretch gap-8 py-20 flex-wrap container-size full-height">
                    <article className="card text-left">
                        <h2 className="h2 text-dark self-start">Le Prince</h2>
                        <p className="max-w-2xl self-start">
                            La tradition est de nommer tous les ans un prince ou une princesse qui représentera le carnaval et notre ville pour chaque édition. Nous nous souviendrons en tout temps de sa grandeur et bonté.
                        </p>
                        <h3 className="h3 text-dark self-start">
                            Edition
                            <span className="font-mono font-extrabold">&nbsp;2024&nbsp;</span>
                            :
                        </h3>
                        <Image
                            src={prince}
                            alt="Portrait de Christophe 1er"
                            className="w-[30ch]"
                        />
                        <p className="max-w-2xl">
                            Arrivé à Monthey le jour de sa naissance, Christophe 1er devient résolument actif dans à peu près tout ce que fait notre cité. s&apos;engage tout petit dans les scouts, mais pas juste le petit scout. Il devient président des anciens! Il commence ses activité canavalesque comme constructeur de chars en 1985, puis rejoint les rangs du Bout&apos;Rions. Aujourd&apos;hui, le voilà hissé au rôle d&apos;acteur principal de notre Carnaval. Longue vie à CHRISTOPHE 1er !!!
                        </p>
                    </article>
                    <article className="card">
                        <h2 className="h2 text-dark text-center">Notre Journal</h2>
                        <Image
                            src={newspaper}
                            alt="Journal du Carnaval"
                            className="max-w-full object-contain"
                        />
                        <Link href="/newspaper">
                            <Button variant="custom" className="p-6">
                                <span className="text-snow custom-shadow h4">
                                    Plus d&apos;Info
                                </span>
                            </Button>
                        </Link>
                    </article>
                </section>
            </div>

            {/* Media Section */}
            <section className="flex-col flex-center gap-6 py-6 text-center container-size full-height">
                <h2 className="h2 text-dark text-center">
                    Nos Sponsors
                </h2>
                <p className="max-w-2xl">
                    Ils soutiennent notre carnaval, nous permettant de refaire des éditions chaque année.
                </p>
                <p className="font-medium">
                    Un grand MERCI !!
                </p>
                <MovingCards
                    items={sponsors}
                    direction={"forwards"}
                    speed={5}
                />
                <h3 className="h2 text-center">
                    Suis nous sur les réseaux
                </h3>
                <span className="flex gap-16 my-4">
                    <a
                        className="hover:scale-90 text-red-900"
                        href="https://www.instagram.com/carnavaldemonthey/"
                    >
                        <FontAwesomeIcon className="w-16 h-16" icon={faInstagram}/>
                    </a>
                    <a
                        className="hover:scale-90 text-red-900"
                        href="https://fr-fr.facebook.com/Carnavaldemonthey/"
                    >
                        <FontAwesomeIcon className="w-16 h-16" icon={faSquareFacebook}/>
                    </a>
                </span>
            </section>
        </>
    )
}
