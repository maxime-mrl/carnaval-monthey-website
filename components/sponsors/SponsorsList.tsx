import { getSponsors } from "@utils/getData";
import Image from "next/image";
import SponsorListEditor from "./SponsorListEditor";
import { getServerSession } from "next-auth";
import authOptions from "@utils/authOptions";

const SponsorsList = async ({ direction = "forwards", speed = 5 } : { direction?: "forwards" | "reverse", speed?: number }) => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const sponsors = await getSponsors();
    return (
        <i className="relative container-size">
            
            {user && user.right >= 2 && 
                <SponsorListEditor sponsors={sponsors} />
            }
            <div
                className="my-6 overflow-hidden shrink-0 w-full"
                style={{
                    "--animation-duration": `${speed*sponsors.length}s`,
                    "--animation-direction": direction
                } as React.CSSProperties}
            >
                <ul className="flex-center gap-16 py-4 w-fit animate-scroll mobile:gap-10">
                    {/* duplicate items to allow smooth repeating */}
                    {[...sponsors, ...sponsors].map((sponsor, idx) => (
                        <li
                            className="w-[300px] max-w-[50vw]"
                            key={idx}
                        >
                            <Image 
                                src={`/sponsor/${sponsor.id}.webp`}
                                alt={sponsor.alt}
                                width={250}
                                height={250}
                                className="object-cover w-full"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </i>
    );
};

export default SponsorsList
