"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faInstagram, faSquareFacebook } from "@node_modules/@fortawesome/free-brands-svg-icons";

type linkType = { href:string, title:string }

export default function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const scrollHandler = () => window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
        window.addEventListener('scroll', scrollHandler);
        scrollHandler();
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <>
        <nav
            className={`text-lg flex justify-between w-full px-[5vw] fixed top-0 left-0 z-10 transitions text-snow backdrop-blur-sm bg-dark/${isScrolled ? '80' : '20'} hover:bg-dark/80`}>
            <Link href="/" className="flex gap-4 flex-center my-3">
                <Image
                    src="/images/logo.png"
                    alt="Logo Carnaval de Monthey"
                    width={50}
                    height={50}
                    className="object-contain"
                />
                <p className="url mobile:hidden">Accueil</p>
                <p className="url hidden mobile:flex">Carnaval de Monthey</p>
            </Link>

            {/* Desktop Navigation */}
            <ul className="mobile:hidden flex gap-5 text-center">
                {/* INFOS */}
                <DropDownItem
                    main={{ href: "/infos", title: "Infos" }}
                    items={[
                        { href:"/infos/#entries", title:"Prix des entrées" },
                        { href:"/infos/#calendar", title:"Le programme" },
                        { href:"/infos/#transport", title:"Accès / Transport" },
                    ]}
                />
                {/* CARNAVAL */}
                <DropDownItem
                    main={{ href: "#", title: "Le carnaval" }}
                    items={[
                        { href:"#", title:"Traditions" },
                        { href:"#", title:"Le Prince" },
                        { href:"#", title:"Thèmes" },
                        { href:"#", title:"Archives" },
                    ]}
                />
                {/* COMUNAUTE */}
                <DropDownItem
                    main={{ href: "#", title: "Communauté" }}
                    items={[
                        { href:"#", title:"Forum" },
                        { href:"#", title:"Jeux / Concours" },
                    ]}
                />
                {/* CONTACT */}
                <DropDownItem
                    main={{ href: "/contact", title: "Contact" }}
                />
            </ul>

            {/* Mobile Burger */}
            <button className="hidden flex-col justify-center items-center mobile:flex gap-[2px]" onClick={() => setIsOpen(!isOpen)}>
                <span className={`bg-snow block transitions h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-snow block transitions h-0.5 w-6 rounded-sm ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`bg-snow block transitions h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </button>
        </nav>

        {/* Mobile navigation */}
        <div className={`${isOpen ? "mobile:flex" : ""} hidden fixed absolute-center z-50 w-[80%] h-fit bg-dark/80 backdrop-blur-sm rounded-lg py-24 text-snow flex-col items-center gap-5`}>
            {/* Navigation */}
            <div className="flex-center flex-col gap-4">
                <Link href='/' className="url" onClick={() => setIsOpen(!isOpen)}>Accueil</Link>
                <Link href='/infos' className="url" onClick={() => setIsOpen(!isOpen)}>Infos</Link>
                <Link href='/carnaval' className="url" onClick={() => setIsOpen(!isOpen)}>Le Carnaval</Link>
                <Link href='/community' className="url" onClick={() => setIsOpen(!isOpen)}>Communauté</Link>
                <Link href='/contact' className="url" onClick={() => setIsOpen(!isOpen)}>Contact</Link>
            </div>

            {/* Logo */}
            <Image
                src="/images/logo.png"
                alt="Carnaval de Monthey"
                width={100}
                height={100}
                className="max-w-[20ch] drop-shadow-2xl mx-auto"
            />

            {/* Socials */}
            <span className="flex gap-16 my-4">
                <a className="url" href="https://www.instagram.com/carnavaldemonthey/">
                    <FontAwesomeIcon className="w-16 h-16" icon={faInstagram}/>
                </a>
                <a className="url" href="https://fr-fr.facebook.com/Carnavaldemonthey/">
                    <FontAwesomeIcon className="w-16 h-16" icon={faSquareFacebook}/>
                </a>
            </span>
        </div>
        </>
    )
}

const DropDownItem = ({ main, items } : {main: linkType, items?:linkType[]}) => (
    <li className="relative h-full flex-center group px-3">
        <Link href={main.href} className="url">{main.title}</Link>
        {items && 
            <ul className="absolute top-full left-1/2 w-[18ch] -translate-x-1/2 px-3 bg-dark/80 overflow-hidden h-fit max-h-0 py-0 transitions group-hover:py-2 group-hover:max-h-[30em]">
            {items.map((item, i) => (
                <li key={i}>
                    <Link href={item.href} className="block p-3 url">
                        {item.title}
                    </Link>
                </li>
            ))}
            </ul>
        }
    </li>
);
