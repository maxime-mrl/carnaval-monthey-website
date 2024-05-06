"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import {useEffect, useState} from "react";
import DropdownMenu from "@components/DropdownMenu";

export default function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);

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
        <nav className={`flex-between w-full py-6 px-16 fixed top-0 left-0 z-20 transitions ${isScrolled ? 'bg-dark' : 'bg-transparent'}`}>
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
            <Sheet>
                <SheetTrigger asChild>
                    <FontAwesomeIcon className="w-8 text-white hover:cursor-pointer transitions hidden mobile:flex" icon={faBars}/>
                </SheetTrigger>
                <SheetContent className="bg-dark">
                    <SheetHeader>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-10">
                        <Link href="/" className="url text-snow">Accueil</Link>
                        <Link href="/infos" className="url text-snow">Infos</Link>
                        <Link href="/" className="url text-snow">Le carnaval</Link>
                        <Link href="/" className="url text-snow">Communauté</Link>
                        <Link href="/" className="url text-snow">Contact</Link>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </nav>
    )
}