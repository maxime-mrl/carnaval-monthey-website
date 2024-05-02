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

export default function Nav() {

    return (
        <nav className="flex-between w-full py-3 px-16 fixed top-0 left-0 z-20 bg-dark">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/images/logo.png"
                    alt="Logo Carnaval de Monthey"
                    width={50}
                    height={50}
                    className="object-contain"
                />
                <p className="logo_text md:hidden">Accueil</p>
                <p className="logo_text hidden md:flex">Carnaval de Monthey</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex gap-5 md:hidden">
                <Link href="/infos" className="logo_text">Infos</Link>
                <Link href="/" className="logo_text">Le carnaval</Link>
                <Link href="/" className="logo_text">Communauté</Link>
                <Link href="/" className="logo_text">Contact</Link>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
                <SheetTrigger asChild>
                    <FontAwesomeIcon className="w-8 text-white hover:cursor-pointer hidden md:flex" icon={faBars}/>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    </SheetHeader>
                    <div className="flex flex-col gap-4 mt-10">
                        <Link href="/" className="logo_text">Accueil</Link>
                        <Link href="/infos" className="logo_text">Infos</Link>
                        <Link href="/" className="logo_text">Le carnaval</Link>
                        <Link href="/" className="logo_text">Communauté</Link>
                        <Link href="/" className="logo_text">Contact</Link>
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