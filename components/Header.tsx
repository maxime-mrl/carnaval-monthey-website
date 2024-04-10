"use client"

import Image from "next/image";
import {ChevronDown} from "lucide-react";

const Header = () => {
    const handleChevronClick = () => { // Ajoute un gestionnaire de clic pour le Chevron
        window.scrollBy({ top: window.innerHeight / 1.2, behavior: 'smooth' });
    };

    return (
        <header className="w-full min-h-screen relative">
            <Image src="/images/monthey.jpg"
                   alt="Défilé du Carnaval"
                   layout="fill"
                   objectFit="cover"
                   className="absolute top-0 left-0 z-0"
            />

            <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-transparent via-yellow-600 to-red-900 opacity-50"/>

            <div className="p-4">
                <ChevronDown strokeWidth={4}
                                        className="h-24 w-24 text-white absolute bottom-[3vh] left-[45vw] z-20 cursor-pointer
                                                            animate-bounce"
                                        onClick={handleChevronClick}
                />
            </div>
        </header>
    );
};

export default Header;