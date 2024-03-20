import React from 'react';
import Image from "next/image";

const Header = () => {
    return (
        <header className="w-full min-h-screen absolute top-0 left-0 -z-10">
            <Image src="/images/monthey.jpg"
                   alt="Défilé du Carnaval"
                   layout="fill"
                   objectFit="cover"
            />
        </header>
    );
};

export default Header;