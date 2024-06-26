import Image from 'next/image';
import React from 'react';

import newspaper from "@public/images/journal.jpg";
import { getTopUser } from '@utils/getData';
import UsersRanks from '@components/UserRanks';

const Events = async () => {
    const ranks = await getTopUser()
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Evenement live</h1>
                <p className='h2 text-snow text-center max-w-4xl'>Tu cherches a t&apos;occuper pendant le carnaval? viens relever nos défis!</p>
            </header>
        </div>
        {/* bars competition */}
        <section id="bars" className="container-size py-section flex flex-wrap gap-10 justify-around items-center">
            <article className='max-w-xl flex flex-col gap-5 items-center'>
                <h2 className='h2 text-center'>Parcours de bars</h2>
                <p className='max-w-[50ch]'>
                    Bois un verre dans le plus de bar possible pour gagner des points, tes points seront affiché sur le forum et un prix seras donné aux trois plus grands trous (et oui là on peux le dire) du carnaval.
                </p>
                <p className='h3 text-center'>Comment ça se passe?</p>
                <p className='max-w-[50ch]'>
                    Après avoir commandé dans un bar partenaire tu pourras demander une “preuve de boisson”, un code QR à scanner. Après t’être connécté a ton compte, les points sont automatiquement marqués!
                </p>
            </article>
            <article className='w-[20rem] max-w-[35rem] grow'>
                <Image
                    src={newspaper}
                    alt="Journal du Carnaval"
                    className="max-w-full object-contain"
                />
            </article>
        </section>
        {/* ranking */}
        <section id="classement" className="py-section">
            <h2 className='h2 text-center'>Classement</h2>
            <UsersRanks ranks={ranks} />
            <p className='text-center max-w-[45ch] mx-auto pt-5'>Tu ne te trouves pas? monte dans le classement, seul le top 10 est affiché!</p>
        </section>
        </>
    );
};

export default Events;