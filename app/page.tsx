// Components imports
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
import { MovingCards } from "@components/MovingCards";
import { getSponsors } from "@utils/getSponsors";

export const revalidate = 3600;

export default async function Home() {
    const sponsors = await getSponsors()
    return (
        <>
            {/* Header component */}
            <Header/>

            {/* Teaser Section */}
            <div className="bg-dark">
                <section className="flex-col flex-center container-size gap-12 py-16">
                    <h2 className="text-5xl text-bouncy font-bold text-snow text-center max-w-3xl">
                        Le plus grand carnaval du Valais, et le meilleur du monde!
                    </h2>
                    <article className="flex-col flex-center gap-6 text-snow">
                        <p className="max-w-3xl">
                            Le carnaval de Monthey c&apos;est 6 jours de folie et tradition ancestral. Du jeudi au mardi, masques, chars, « guggenmusik », et autres animations rythment le cœur de notre ville de Monthey. Le fameux cortège du  régionale ou internationale, attire quant à lui chaque année un large public
                        </p>
                        <h3 className="text-3xl text-bouncy font-bold">
                            ... et, ce depuis plus de
                            <span className="font-mono font-extrabold text-3xl">&nbsp;150&nbsp;</span>
                            ans!
                        </h3>
                    </article>

                    <article className="flex-col flex-center text-snow gap-16">
                        <h3 className="text-4xl text-bouncy font-bold text-snow text-center">
                            Qu&apos;est ce que t&apos;attends pour venir?
                        </h3>
                        <Link href="/infos">
                            <Button variant="custom" className="text-bouncy-shadow text-2xl p-6 mb-8">
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
            <div className="bg-gradient-to-br from-snow to-yellow-500/60">
                <section className="flex justify-center items-stretch gap-8 py-20 flex-wrap container-size">
                    <article className="card text-left">
                        <h3 className="text-4xl text-bouncy font-bold text-dark self-start">Le Prince</h3>
                        <p className="max-w-2xl self-start">
                            La tradition est de nommer tous les ans un prince ou une princesse qui représentera le carnaval et notre ville pour chaque édition. Nous nous souviendrons en tout temps de sa grandeur et bonté.
                        </p>
                        <h3 className="text-4xl text-bouncy font-bold text-dark self-start">
                            Edition
                            <span className="font-mono font-extrabold">&nbsp;2024&nbsp;</span>
                            :
                        </h3>
                        <Image
                            src={prince}
                            alt="Portrait de Christophe 1er"
                            className="w-[30ch]"
                        />
                        <p className="max-w-2xl self-start">
                            Arrivé à Monthey le jour de sa naissance, Christophe 1er devient résolument actif dans à peu près tout ce que fait notre cité. s&apos;engage tout petit dans les scouts, mais pas juste le petit scout. Il devient président des anciens! Il commence ses activité canavalesque comme constructeur de chars en 1985, puis rejoint les rangs du Bout&apos;Rions. Aujourd&apos;hui, le voilà hissé au rôle d&apos;acteur principal de notre Carnaval. Longue vie à CHRISTOPHE 1er !!!
                        </p>
                    </article>
                    <article className="card">
                        <h3 className="text-4xl text-bouncy font-bold text-dark">Notre Journal</h3>
                        <Image
                            src={newspaper}
                            alt="Journal du Carnaval"
                            className="max-w-full max-h-[85%] object-contain"
                        />
                        <Link href="/newspaper">
                            <Button variant="custom" className="p-6">
                                <span className="text-snow text-bouncy-shadow text-2xl">
                                    Plus d&apos;Info
                                </span>
                            </Button>
                        </Link>
                    </article>
                </section>
            </div>

            {/* Media Section */}
            <section className="flex-col flex-center gap-6 py-6 text-center container-size">
                <h3 className="text-4xl text-bouncy font-semibold text-dark text-center">
                    Nos Sponsors
                </h3>
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
                <h3 className="text-4xl text-bouncy font-semibold text-center">
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
