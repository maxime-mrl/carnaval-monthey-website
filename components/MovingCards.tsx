import { cn } from "@/utils/chadcn";
import Image from "next/image";

export const MovingCards = ({
    items, direction = "forwards", speed = 40
} : {
    items: { src: string, alt: string }[], direction?: "forwards" | "reverse", speed?: number,
}) => {
    return (
        <div
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden shrink-0 w-full"
            )}
            style={ {
                "--animation-duration": `${speed}s`,
                "--animation-direction": direction
            } as React.CSSProperties }
        >
            <ul
                className={cn(
                    "flex shrink-0 gap-4 py-4 w-max flex-nowrap animate-scroll"
                )}
            >
                {/* duplicate items to allow smooth repeating */}
                {[...items, ...items].map((sponsor, idx) => (
                    <li
                        className="w-[350px] max-w-full relative flex-shrink-0 px-8 py-6 md:w-[450px]"
                        key={idx}
                    >
                        <Image 
                            src={sponsor.src}
                            alt={sponsor.alt}
                            width={250}
                            height={250}
                            className="w-full h-full object-cover"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
