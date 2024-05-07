"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useState} from "react";
import DropdownMenu from "@components/DropdownMenu";
import {faInstagram, faSquareFacebook} from "@node_modules/@fortawesome/free-brands-svg-icons";

export default function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (e:any) => {
        if (e.target.tagName === 'Link') {
            setIsOpen(false);
        } else {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
        };

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <nav
            className={`flex-between w-full py-6 px-16 fixed top-0 left-0 z-20 transitions ${isScrolled ? 'bg-dark' : 'bg-transparent'}`}>
            <Link href="/" className="flex gap-4 flex-center">
                <Image
                    src="/images/logo.png"
                    alt="Logo Carnaval de Monthey"
                    width={50}
                    height={50}
                    className="object-contain"
                />
                <p className="url text-snow mobile:hidden">Accueil</p>
                <p className="url text-snow hidden mobile:flex">Carnaval de Monthey</p>
            </Link>

            {/* Desktop Navigation */}
            <DropdownMenu />

            {/* Mobile Navigation */}
            <button className="hidden flex-col justify-center items-center mobile:flex" onClick={handleClick}>
                <span
                    className={`bg-snow block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'} `}></span>
                <span
                    className={`bg-snow block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'} `}></span>
                <span
                    className={`bg-snow block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'} `}></span>
            </button>

            {
                isOpen ?
                    <div
                        className="w-[80%] h-[80%] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
                                            bg-dark/30 rounded-lg backdrop-blur-md py-24">

                        {/* Navigation */}
                        <div className="flex-center flex-col gap-4 text-snow">
                            <Link href='/' className="url text-2xl" onClick={handleClick}>Accueil</Link>
                            <Link href='/infos' className="url" onClick={handleClick}>Infos</Link>
                            <Link href='/carnaval' className="url" onClick={handleClick}>Le Carnaval</Link>
                            <Link href='/community' className="url" onClick={handleClick}>Communauté</Link>
                            <Link href='/contact' className="url" onClick={handleClick}>Contact</Link>
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
                            <a
                                className="hover:scale-90 text-snow"
                                href="https://www.instagram.com/carnavaldemonthey/"
                            >
                                <FontAwesomeIcon className="w-16 h-16" icon={faInstagram}/>
                            </a>
                            <a
                                className="hover:scale-90 text-snow"
                                href="https://fr-fr.facebook.com/Carnavaldemonthey/"
                            >
                                <FontAwesomeIcon className="w-16 h-16" icon={faSquareFacebook}/>
                            </a>
                        </span>
                    </div>
                    : null
            }
        </nav>
    )
}