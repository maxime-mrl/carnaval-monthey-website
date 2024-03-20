import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "./Provider";

export const metadata = {
    title: "Carnaval de Monthey",
    description: "Le meilleur carnaval de suisse"
};

export default function Rootlayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <Provider>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}