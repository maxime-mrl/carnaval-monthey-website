"use client"

import Link from "next/link"

export function DropdownMenu() {
    return (
        <ul className="mobile:hidden flex gap-5 text-center">
                {/* INFOS */}
                <DropDownItem
                    main={{ href: "/infos", title: "Infos" }}
                    items={[
                        { href:"/infos/#entries", title:"Prix des entrées" },
                        { href:"/infos/#calendar", title:"Le programme" },
                        { href:"/infos/#transport", title:"Accès / Transport" },
                    ]}
                />
                {/* CARNAVAL */}
                <DropDownItem
                    main={{ href: "#", title: "Le carnaval" }}
                    items={[
                        { href:"#", title:"Traditions" },
                        { href:"#", title:"Le Prince" },
                        { href:"#", title:"Thèmes" },
                        { href:"#", title:"Archives" },
                    ]}
                />
                {/* COMUNAUTE */}
                <DropDownItem
                    main={{ href: "#", title: "Communauté" }}
                    items={[
                        { href:"#", title:"Forum" },
                        { href:"#", title:"Jeux / Concours" },
                    ]}
                />
                {/* CONTACT */}
                
                <DropDownItem
                    main={{ href: "/contact", title: "Contact" }}
                />
        </ul>
    )
}

type linkType = { href:string, title:string }

const DropDownItem = ({ main, items } : {main: linkType, items?:linkType[]}) => (
    <li className="relative h-full flex-center group px-3">
        <Link href={main.href} className="url">{main.title}</Link>
        {items && 
            <ul className="absolute top-full left-1/2 w-[18ch] -translate-x-1/2 px-3 bg-dark/80 overflow-hidden h-fit max-h-0 py-0 transitions group-hover:py-2 group-hover:max-h-[30em]">
            {items.map((item, i) => (
                <li key={i}>
                    <Link href={item.href} className="block p-3 url">
                        {item.title}
                    </Link>
                </li>
            ))}
            </ul>
        }
    </li>
)

export default DropdownMenu