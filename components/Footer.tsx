import {Instagram, Facebook} from 'lucide-react';
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
        <footer className="w-full flex-between bg-dark text-white p-10 text-center">
            <div className="flex flex-col text-left items-start">
                <div className="flex flex-col">
                    {addressLines.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>

                <span className="flex gap-4 my-5">
                    <a className="hover:scale-90" href="https://www.instagram.com/carnavaldemonthey/"><Instagram
                        size={45}/></a>
                    <a className="hover:scale-90" href="https://fr-fr.facebook.com/Carnavaldemonthey/"><Facebook
                        size={45}/></a>
                </span>

                <div>
                    <p>www.carnavaldemonthey.com | www.monthey.ch</p>
                    <p>Copyright © {year} Carnaval de Monthey - Tous droits réservés</p>
                    <p>Site réalisé par Maxime Morel et Eric Tourvieille</p>
                </div>
            </div>

            <div className="self-start">
                <Image src="/images/logo.png" alt="Carnaval de Monthey" width={200} height={200}
                       className="drop-shadow-2xl xs:w-28 sm:w-48 md:w-60 lg:w-72 xl:w-60"/>
            </div>

            <div className="flex flex-col gap-2">
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