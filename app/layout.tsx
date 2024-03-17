import "@styles/globals.css";
import React from "react";

import Nav from "@components/Nav";

export const metadata = {
    title: "Carnaval de Monthey",
    description: "Le meilleur carnaval de suisse"
};

export default function Rootlayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}