import Link from "next/link";
import Image from "next/image";

export default function Nav() {
    return (
        <nav className="flex-between w-full mb-16 p-9">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/logo.png" alt="Logo Carnaval de Monthey" width={50} height={50} className="object-contain"/>
                <p className="logo_text">Accueil</p>
            </Link>

            <Link href="/" className="flex gap-2 flex-center">
                <p className="logo_text">Infos</p>
            </Link>
        </nav>
    )
}