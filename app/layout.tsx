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
            <body>
                <Provider>
                    <div className="flex flex-col justify-between min-h-screen">
                        <Nav />
                            <div className="flex-grow">{children}</div>
                        <Footer />
                    </div>
                </Provider>
            </body>
        </html>
    )
}