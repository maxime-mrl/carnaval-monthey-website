import Image from 'next/image';
import React from 'react';

import map from "@public/images/map-parking.jpg";
import Link from 'next/link';

import newspaper from "@public/images/journal.png";
import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';

const InfoPage = () => {
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='pt-24 pb-10 flex-center flex-col gap-10 container-size'>
                <h1 className="h1 text-gradient text-center">Nous contacter</h1>
                <p className='h2 text-snow text-center max-w-4xl'>Tu as une question? Tu veux un stand ou vendre le journal? Et bien c&apos;est ici!</p>
            </header>
        </div>
        {/* Journal */}
        <section id="journal" className="container-size py-10 flex flex-wrap gap-10 justify-around items-center">
            <article className='max-w-xl flex flex-col gap-5'>
                <h2 className='h2 text-center'>Vendre le journal:</h2>
                <p className='max-w-[45ch]'>Tu veux vendre le journal de Carnaval ? C&apos;est super ! Comment ça se passe?</p>
                <ul className='list-disc list-inside'>
                    <li>Chaque journal est vendu <strong>CHF 5.-</strong></li>
                    <li><strong>Tu gagnes 1.- par journal</strong> vendu. Si tu reçois de l&apos;argent en plus, il est pour toi.</li>
                    <li>Si tu n&apos;as pas tout vendu, <strong>tu dois ramener les journaux qui te restent</strong>. On t&apos;aidera à faire le calcul de ce que tu dois rendre et de ce que tu as gagné.</li>
                    <li>Tu dois rapporter les invendus et l&apos;argent <strong>au plus tard le mercredi 14 février 2024 !</strong></li>
                </ul>
                <p className='h3 text-center'>Les O meilleurs vendeur seront recompensé!</p>
                <h3 className='h3'>S&apos;inscrire</h3>
                <div>
                    <p>Avant toutes choses, tu dois avoir plus de 10ans et tes parents doivent être d’accord!</p>
                    <p>Tour bon? alors remplis le formulaire petit vendeur disponible <a href="#" target='_blanck'>ici</a></p>
                </div>
            </article>
            <article className='w-[20rem] max-w-[35rem] grow'>
                <Image
                    src={newspaper}
                    alt="Journal du Carnaval"
                    className="max-w-full object-contain"
                />
            </article>
        </section>
        {/* stand */}
        <section id="stands" className="container-size py-10 flex-center">
            <article className='max-w-xl flex-center flex-col gap-5 text-center'>
                <h2 className='h2'>Demande de stand exterieur</h2>
                <p>
                    Tu souhaite obtenir un stand exterieur pendant le carnaval? remplis le formulaire disponible ci dessous et envoie le à l&apos;adresse suivante: <br />
                    Carnaval de Monthey, Case postale 423, 1870 Monthey
                </p>
                <Button variant="custom" className="text-snow text-shadow h4 p-6">
                    Télécharger le formulaire
                </Button>
            </article>
        </section>
        <section id="contact" className="container-size py-10 flex flex-col">
            <h2 className='h2'>Autre chose? ecrit nous:</h2>
            <form className='flex-center flex-col gap-5'>
                <div className='flex gap-x-10 gap-y-5 flex-wrap w-full'>
                    <FormInput
                        name='name'
                        label='Votre nom:'
                        placeholder='Nom et Prénom'
                        type='text'
                        className="w-[40ch] grow"
                    />
                    <FormInput
                        name='mail'
                        label='Votre E-mail:'
                        placeholder='exemple@mail.com'
                        type='email'
                        className="w-[40ch] grow"
                    />
                </div>
                <FormInput
                    name='subject'
                    label='Sujet:'
                    placeholder='Décrivez votre demande'
                    type='text'
                />
                <FormInput
                    name='message'
                    label='Message:'
                    placeholder='Votre message'
                    type='text'
                />
                <Button variant="custom" className="text-snow text-shadow h4 p-6" type='submit'>
                    Envoyer
                </Button>
            </form>
        </section>
        </>
    );
};

export default InfoPage;