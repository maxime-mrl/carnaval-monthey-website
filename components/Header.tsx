import Image from "next/image";
import {ChevronDown} from "lucide-react";

const Header = () => {
    const images = [
        "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

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
                                                            animate-bounce"/>
            </div>
        </header>
    );
};

export default Header;