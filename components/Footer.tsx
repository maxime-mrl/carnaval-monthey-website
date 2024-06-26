import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import Image from "next/image";
import Link from "next/link";


const Footer = () => {
    const sitePlanLines = [
        { href:"/", title:"Accueil" },
        { href:"/infos", title:"infos" },
        { href:"/", title:"Le carnaval" },
        { href:"/", title:"Forum" },
        { href:"/events", title:"Evenements" },
        { href:"/shop", title:"Boutique" },
        { href:"/contact", title:"Contact" },
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
                        <p>Carnaval de Monthey</p>
                        <p>Rue du Triboulet 28</p>
                        <p>Case postale 423</p>
                        <p>1870 Monthey</p>
                        <p>Switzerland</p>
                    </article>

                    <article className="flex gap-4">
                        <a className="hover:scale-90" href="https://www.instagram.com/carnavaldemonthey/" aria-label='Instagram'>
                            <FontAwesomeIcon className="w-12 h-12" icon={faInstagram} />
                        </a>
                        <a className="hover:scale-90" href="https://fr-fr.facebook.com/Carnavaldemonthey/" aria-label='facebook'>
                            <FontAwesomeIcon className="w-12 h-12" icon={faSquareFacebook} />
                        </a>
                    </article>

                    <article>
                        <p>www.carnavaldemonthey.com | www.monthey.ch</p>
                        <p>Copyright © {new Date().getFullYear()} Carnaval de Monthey - Tous droits réservés</p>
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
                    <span className="relative w-full h-full max-w-[20ch] drop-shadow-2xl">
                        <Image
                            src="/images/logo.png"
                            alt="Carnaval de Monthey"
                            fill={true}
                            sizes='10em'
                            style={{objectFit: "contain"}}
                        />
                    </span>
                </section>
                {/* Site plan */}
                <section className="flex flex-col items-end gap-1 mobile:items-center mobile:gap-0">
                    <h3 className="font-bold mb-2">Plan du site</h3>
                    {sitePlanLines.map((url, index) => (
                        <Link href={url.href} key={index} className='py-1 url text-snow'>
                            {url.title}
                        </Link>
                    ))}
                </section>
            </div>
        </footer>
    );
};

export default Footer;