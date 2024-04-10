import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faSquareFacebook} from '@fortawesome/free-brands-svg-icons'
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    const addressLines = [
        "Carnaval de Monthey",
        "Rue du Triboulet 28",
        "Case postale 423",
        "1870 Monthey",
        "Switzerland"
    ]

    const sitePlanLines = [
        "Accueil",
        "Programme",
        "Galerie",
        "Forum",
        "Informations",
        "Partenaires",
        "Contact"
    ]

    return (
        <footer className="w-full flex-between flex-wrap bg-dark text-white p-10 text-center relative md:flex-row">
            <div className="flex flex-col text-left items-start md:mb-6">
                <div className="flex flex-col">
                    {addressLines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>

                <span className="flex gap-4 my-5">
                    <a className="hover:scale-90" href="https://www.instagram.com/carnavaldemonthey/"><FontAwesomeIcon className="w-12 h-12" icon={faInstagram} /></a>
                    <a className="hover:scale-90" href="https://fr-fr.facebook.com/Carnavaldemonthey/"><FontAwesomeIcon className="w-12 h-12" icon={faSquareFacebook} /></a>
                </span>

                <div>
                    <p>www.carnavaldemonthey.com | www.monthey.ch</p>
                    <p>Copyright © {year} Carnaval de Monthey - Tous droits réservés</p>
                    <p>Site réalisé par <a className="hover:underline" href="https://maxime-morel.xyz/" target="_blank">Maxime Morel</a> et
                                                    <a className="hover:underline" href="https://port-folio-next-tourvieilles-projects.vercel.app/" target="_blank"> Eric Tourvieille</a></p>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:hidden md:block md:right-0 md:left-auto">
                <Image src="/images/logo.png" alt="Carnaval de Monthey" width={200} height={200}
                       className="w-72 drop-shadow-2xl xs:w-28 sm:w-40 md:w-44 lg:w-52 xl:w-64"/>
            </div>

            <div className="flex flex-col text-end gap-2 md:hidden">
                <h3 className="font-bold mb-2">Plan du site</h3>
                {sitePlanLines.map((line, index) => (
                    <Link href={`/${line.toLowerCase()}`} key={index}>
                        {line}
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;