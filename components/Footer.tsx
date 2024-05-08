import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
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
        <footer className="w-full bg-dark text-snow">
            {/* footer content */}
            <div className='
                grid grid-cols-[3.5fr_1fr_3.5fr] grid-rows-1 container-size py-10
                mobile:grid-cols-1 mobile:grid-rows-[auto_auto] gap-y-16
            '>
                {/* Adress & copyright stuff */}
                <section className='flex flex-col gap-5 mobile:text-center mobile:items-center mobile:row-start-2'>
                    <article>
                        {addressLines.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </article>

                    <article className="flex gap-4">
                        <a className="hover:scale-90" href="https://www.instagram.com/carnavaldemonthey/">
                            <FontAwesomeIcon className="w-12 h-12" icon={faInstagram} />
                        </a>
                        <a className="hover:scale-90" href="https://fr-fr.facebook.com/Carnavaldemonthey/">
                            <FontAwesomeIcon className="w-12 h-12" icon={faSquareFacebook} />
                        </a>
                    </article>

                    <article>
                        <p>www.carnavaldemonthey.com | www.monthey.ch</p>
                        <p>Copyright © {year} Carnaval de Monthey - Tous droits réservés</p>
                        <p>
                            Site réalisé par&nbsp;
                            <Link href="https://maxime-morel.xyz/" target='_blank' className='url text-snow'>
                                Maxime Morel
                            </Link>
                            &nbsp;et&nbsp;
                            <Link href="https://port-folio-next-tourvieilles-projects.vercel.app/" target='_blank' className='url text-snow'>
                                Eric Tourvieille
                            </Link>
                        </p>
                    </article>
                </section>
                {/* Logo */}
                <section className="flex-center mobile:hidden">
                    <Image
                        src="/images/logo.png"
                        alt="Carnaval de Monthey"
                        width={200}
                        height={200}
                        className="w-full max-w-[20ch] drop-shadow-2xl"
                    />
                </section>
                {/* Site plan */}
                <section className="flex flex-col items-end gap-1 mobile:items-center mobile:gap-0">
                    <h3 className="font-bold mb-2">Plan du site</h3>
                    {sitePlanLines.map((line, index) => (
                        <Link href={`/${line.toLowerCase()}`} key={index} className='py-1 url text-snow'>
                            {line}
                        </Link>
                    ))}
                </section>
            </div>
        </footer>
    );
};

export default Footer;