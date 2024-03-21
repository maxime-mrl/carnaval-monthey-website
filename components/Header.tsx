import React from 'react';
import Image from "next/image";
import {ChevronDown} from "lucide-react";

const Header = () => {
    return (
        <header className="w-full min-h-screen absolute top-0 left-0 -z-10">

            <Image src="/images/monthey.jpg"
                   alt="Défilé du Carnaval"
                   layout="fill"
                   objectFit="cover"
                   className="absolute top-0 left-0 z-0"
            />
            <div
                className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-transparent via-yellow-600 to-red-900 opacity-50"/>

            <div className="p-4">
                <ChevronDown strokeWidth={4}
                                        className="h-24 w-24 text-white absolute bottom-10 left-[48%] z-20 cursor-pointer
                                                            hover:animate-bounce transition-transform duration-500 ease-in-out"/>
            </div>

        </header>
    );
};

export default Header;