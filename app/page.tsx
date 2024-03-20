import AnimatedText from "@components/AnimatedText";
import Header from "@components/Header";

export default function Home() {
    return (
        <>
            <Header/>
            <AnimatedText text="Carnaval de Monthey" className="uppercase text-6xl text-shadow-xl"/>
        </>
    )
}
