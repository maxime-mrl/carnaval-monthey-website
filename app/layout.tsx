import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "./Provider";
import Footer from "@components/Footer";

export const metadata = {
    title: "Carnaval de Monthey",
    description: "Le meilleur carnaval de suisse"
};

export default function Rootlayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <Provider>
            <body>
                <Nav />
                    <>{children}</>
                <Footer />
            </body>
        </Provider>
        </html>
    )
}