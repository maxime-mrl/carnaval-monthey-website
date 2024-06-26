// Components imports
import { Button } from "@components/ui/button";

// Module imports
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faInstagram, faSquareFacebook } from "@node_modules/@fortawesome/free-brands-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"

// Assets imports
import prince from "@public/images/prince-picture.png";
import newspaper from "@public/images/journal.jpg";
import SponsorsList from "@components/sponsors/SponsorsList";
import CustomText from "@components/CustomText/CustomText";

const Home = async () => {
    return (
        <>
            {/* Header component */}
            <header className="w-full h-dvh relative bg-[url('/images/monthey.jpg')] bg-cover">
                {/* Gradient */}
                <div className="absolute top-0 z-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-yellow-600 to-red-900 opacity-50"/> 
                <div className="z-1 relative h-full">
                    <div className="h-full flex-col flex-center gap-6 drop-shadow-3xl">
                        <span className="relative w-80 h-80 mobile:w-60 mobile:h-60">
                            <Image src="/images/logo.png"
                                loading="eager"
                                priority={true}
                                alt="Carnaval de Monthey"
                                fill={true}
                                sizes="20em"
                                style={{objectFit: "contain"}}
                            />
                        </span>
                        <h1 className="h1 text-gradient text-center">Carnaval de Monthey</h1>
                    </div>
                    <Link href="#about" className="absolute w-full bottom-[3vh] flex justify-center" aria-label="Naviguer vers le bas">
                        <FontAwesomeIcon className="h-24 w-24 text-white cursor-pointer animate-bounce" icon={faAngleDown}/>
                    </Link>
                </div>
            </header>

            {/* Teaser Section */}
            <div className="bg-dark">
                <section className="flex-col flex-center container-size gap-12 py-section" id="about">
                    <h2 className="h2 text-snow text-center max-w-3xl">
                        {/* Le plus grand carnaval du Valais, et le meilleur du monde! */}
                        <CustomText id={"test"} />
                    </h2>
                    <article className="flex-col flex-center gap-6 text-snow max-w-3xl">
                        <p>
                            Le carnaval de Monthey c&apos;est 6 jours de folie et tradition ancestral. Du jeudi au mardi, masques, chars, « guggenmusik », et autres animations rythment le cœur de notre ville de Monthey. Le fameux cortège du  régionale ou internationale, attire quant à lui chaque année un large public
                        </p>
                        <h3 className="h3 w-full">
                            ... et, ce depuis plus de OOO ans!
                        </h3>
                    </article>

                    <article className="flex-col flex-center text-snow gap-16">
                        <h3 className="h3 text-center">
                            Qu&apos;est ce que t&apos;attends pour venir?
                        </h3>
                        <Link href="/infos">
                            <Button variant="gradient">
                                Informations OOOO
                            </Button>
                        </Link>
                    </article>
                </section>
            </div>

            {/* Information Section */}
            <div className="bg-gradient-to-br from-snow to-arylide">
                <section className="flex justify-center items-stretch gap-8 py-section flex-wrap container-size">
                    <article className="card text-left">
                        <h2 className="h2 self-start">Le Prince</h2>
                        <p className="max-w-2xl self-start">
                            La tradition est de nommer tous les ans un prince ou une princesse qui représentera le carnaval et notre ville pour chaque édition. Nous nous souviendrons en tout temps de sa grandeur et bonté.
                        </p>
                        <h3 className="h3 self-start">
                            Edition OOOO:
                        </h3>
                        <div className="flex-center flex-col">
                            <Image
                                src={prince}
                                alt="Portrait de Christophe 1er"
                                sizes="20ch"
                                className="w-[20ch]"
                            />
                            <p className="h3 relative mt-[-1em] z-10 text-center">
                                <span>Christophe IER</span>
                                <svg
                                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 z-[-1] -translate-x-1/2 w-[110%]"
                                    width="381"
                                    height="88"
                                    viewBox="0 0 381 88"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    d="M355.926 52.283C343.671 51.5538 330.28 54.1832 318.411 55.5459C288.686 58.9583 259.607 62.6176 229.116 62.2048C200.629 61.819 170.878 61.7005 142.686 56.393C121.235 52.3545 99.2601 47.1185 78.2077 41.5421C71.6756 39.8118 65.6782 37.0839 59.1832 35.2751C53.6244 33.7271 48.4003 32.2585 42.9654 30.4289C39.7513 29.3469 36.4403 28.4814 33.1777 27.5141C30.7438 26.7926 27.757 25.3915 25.2766 25.0851"
                                    stroke="#E9D356"
                                    strokeWidth="50"
                                    strokeLinecap="round"
                                /></svg>
                            </p>
                        </div>
                        <p className="max-w-2xl">
                            Arrivé à Monthey le jour de sa naissance, Christophe 1er devient résolument actif dans à peu près tout ce que fait notre cité. s&apos;engage tout petit dans les scouts, mais pas juste le petit scout. Il devient président des anciens! Il commence ses activité canavalesque comme constructeur de chars en 1985, puis rejoint les rangs du Bout&apos;Rions. Aujourd&apos;hui, le voilà hissé au rôle d&apos;acteur principal de notre Carnaval. Longue vie à CHRISTOPHE 1er !!!
                        </p>
                    </article>
                    <article className="card">
                        <h2 className="h2 text-center">Notre Journal</h2>
                        <Image
                            src={newspaper}
                            alt="Journal du Carnaval"
                            className="max-w-full object-contain"
                        />
                        <Link href="/shop">
                            <Button variant="gradient">
                                Plus d&apos;Info
                            </Button>
                        </Link>
                    </article>
                </section>
            </div>

            {/* Media Section */}
            <section className="flex-col flex-center gap-6 py-section text-center container-size">
                <h2 className="h2 text-dark text-center">
                    Nos Sponsors
                </h2>
                <p className="max-w-2xl">
                    Ils soutiennent notre carnaval, nous permettant de refaire des éditions chaque année.
                </p>
                <p className="font-medium">
                    Un grand MERCI !!
                </p>
                <SponsorsList />
                <h3 className="h2 text-center">
                    Suis nous sur les réseaux
                </h3>
                <span className="flex gap-16 my-4">
                    <a
                        className="hover:scale-90 text-red-900"
                        href="https://www.instagram.com/carnavaldemonthey/"
                        aria-label="Instagram"
                    >
                        <FontAwesomeIcon className="w-16 h-16" icon={faInstagram}/>
                    </a>
                    <a
                        className="hover:scale-90 text-red-900"
                        href="https://fr-fr.facebook.com/Carnavaldemonthey/"
                        aria-label="Facebook"
                    >
                        <FontAwesomeIcon className="w-16 h-16" icon={faSquareFacebook}/>
                    </a>
                </span>
            </section>
        </>
    )
}

export default Home;