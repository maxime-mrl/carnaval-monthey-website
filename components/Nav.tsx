import Link from "next/link";
import Image from "next/image";
import {Menu} from "@node_modules/lucide-react";
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
        <nav className="flex-between w-full mb-16 py-12 px-16 absolute top-0 left-0 z-20">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/logo.png" alt="Logo Carnaval de Monthey" width={50} height={50}
                       className="object-contain"/>
                <p className="logo_text md:hidden">Accueil</p>
                <p className="logo_text hidden md:flex">Carnaval de Monthey</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex gap-5 md:hidden">
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

            {/* Mobile Navigation */}
            <Sheet>
                <SheetTrigger asChild>
                    <Menu strokeWidth={2.3} size={24} className="text-white hover:cursor-pointer hidden md:flex" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    </SheetHeader>
                        <div className="flex flex-col gap-4 mt-10">
                            <Link href="/">
                                <p className="logo_text">Accueil</p>
                            </Link>
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
                    <SheetFooter>
                        <SheetClose asChild>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </nav>
    )
}