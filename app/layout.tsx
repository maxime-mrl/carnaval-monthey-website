import "@styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import Nav from "@components/Nav";
import Provider from "./Provider";
import Footer from "@components/Footer";
import { ToastContainer } from "react-toastify";

export const metadata = {
    title: "Carnaval de Monthey",
    description: "Le meilleur carnaval de suisse"
};

export default function Rootlayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body suppressHydrationWarning>
                    <ToastContainer />
                    <Provider>
                        <Nav />
                            <>{children}</>
                        <Footer />
                    </Provider>
            </body>
        </html>
    )
}