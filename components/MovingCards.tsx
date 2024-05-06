import Image from "next/image";

export const MovingCards = ({
    items, direction = "forwards", speed = 5
} : {
    items: { src: string, alt: string }[], direction?: "forwards" | "reverse", speed?: number,
}) => {
    return (
        <div
            className="my-6 overflow-hidden shrink-0 w-full"
            style={{
                "--animation-duration": `${speed*items.length}s`,
                "--animation-direction": direction
            } as React.CSSProperties}
        >
            <ul className="flex-center gap-16 py-4 w-fit animate-scroll mobile:gap-10">
                {/* duplicate items to allow smooth repeating */}
                {[...items, ...items].map((sponsor, idx) => (
                    <li
                        className="w-[300px] max-w-[50vw]"
                        key={idx}
                    >
                        <Image 
                            src={sponsor.src}
                            alt={sponsor.alt}
                            width={250}
                            height={250}
                            className="object-cover w-full"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
