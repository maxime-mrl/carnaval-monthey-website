"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/utils/chadcn"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function DropdownMenu() {
    return (
        <NavigationMenu className="mobile:hidden">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href="/infos">Infos</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <ListItem href="/infos" title="Prix des entrées"/>

                            <ListItem href="/infos/#calendar" title="Le programme"/>

                            <ListItem href="/infos/#transport" title="Accès / Transport"/>

                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/">Le carnaval</Link>
                </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid grid-cols-[.75fr_1fr] gap-3 p-6 md:w-[400px] lg:w-[500px]">
                            <ListItem href="" title="Traditions"/>

                            <ListItem href="" title="Le Prince"/>

                            <ListItem href="" title="Thèmes"/>

                            <ListItem href="" title="Archives"/>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        <Link href="/">Communauté</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid grid-cols-[1.5fr_1fr] gap-3 p-6 md:w-[400px] lg:w-[500px]">
                            <ListItem href="" title="Forum"/>

                            <ListItem href="" title="Jeux/Concours"/>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Contact
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-red-500 hover:font-bold",
                        className
                    )}
                    {...props}
                >
                    <div className="text-md font-medium leading-none ">{title}</div>
                    <p className="line-clamp-2 text-md leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default DropdownMenu