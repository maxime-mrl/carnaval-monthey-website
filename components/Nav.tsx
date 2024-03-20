import Link from "next/link";
import Image from "next/image";

export default function Nav() {

    return (
        <nav className="flex-between w-full mb-16 py-9 px-12">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/logo.png" alt="Logo Carnaval de Monthey" width={50} height={50}
                       className="object-contain"/>
                <p className="logo_text">Accueil</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex gap-5 md:flex hidden">
                <Link href="/infos">
                    <p className="logo_text">Infos</p>
                </Link>

                <Link href="/">
                    <p className="logo_text">Le carnaval</p>
                </Link>

                <Link href="/">
                    <p className="logo_text">Communauté</p>
                </Link>

                <Link href="/">
                    <p className="logo_text">Contact</p>
                </Link>
            </div>
        </nav>
    )
}