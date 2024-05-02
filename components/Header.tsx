"use client"

import { ChevronDown } from "lucide-react";
import Image from "next/image";

const Header = () => {
    const handleChevronClick = () => { // Ajoute un gestionnaire de clic pour le Chevron
        window.scrollBy({ top: window.innerHeight / 1.2, behavior: 'smooth' });
    };

    return (
        <header className="w-full h-dvh relative bg-[url('/images/monthey.jpg')] bg-cover">
            {/* Gradient */}
            <div className="absolute top-0 z-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-yellow-600 to-red-900 opacity-50"/> 
            <div className="z-1 relative h-full">
                <div className="h-full flex-col flex-center gap-6 drop-shadow-3xl">
                    <Image src="/images/logo.png"
                        alt="Carnaval de Monthey"
                        width={200} height={200}
                        className="w-80
                        sm:w-48 md:w-60 xl:w-72"
                    />
                    <h1 className="text-bouncy-gradient text-7xl text-center
                        md:text-5xl lg:text-6xl"
                    >Carnaval de Monthey</h1>
                </div>
                <div className="absolute w-full bottom-[3vh] flex justify-center">
                    <ChevronDown strokeWidth={4}
                        className="h-24 w-24 text-white cursor-pointer animate-bounce"
                        onClick={handleChevronClick}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;