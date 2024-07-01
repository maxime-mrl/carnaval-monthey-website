"use client"

import Image from 'next/image';
import React, { FormEvent } from 'react';

import Link from 'next/link';

import newspaper from "@public/images/journal.jpg";
import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { notification } from '@utils/notifications';
import parseErrors from '@utils/parseErrors';
import { z } from 'zod';

const Contact = () => {
    
    const zodCheck = z.object({
        name: z.string().regex(/^.{2,40}$/i, "Nom invalide (entre 2 et 40 charactères)."),
        mail: z.string().regex(/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i, 'E-mail invalide.'),
        subject: z.string().regex(/^.{5,100}$/i, 'Ton sujet doit faire entre 5 et 100 charactères.'),
        message: z.string().regex(/^.{20,5000}$/i, 'Ton message doit faire entre 20 et 5000 charactères.'),
    });

    async function sendContact(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        try {
            // check every input is present
            if (!form.get("name") || !form.get("mail") || !form.get("subject") || !form.get("message")) throw new Error("Merci de remplir tous les champs");
            // check data validity
            const inputs = zodCheck.parse({
                name: form.get("name") as string,
                mail: form.get("mail") as string,
                subject: form.get("subject") as string,
                message: form.get("message") as string
            });
            // fake send message
            notification("success", `Votre mesage "${inputs.subject.slice(0,3)}..." à bien été envoyé!`);
            const formElement = e.target as HTMLFormElement
            formElement.reset()
        } catch (err) {
           notification("error", parseErrors(err));
        }
    }
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Nous contacter</h1>
                <p className='h2 text-snow text-center max-w-4xl'>Tu as une question? Tu veux un stand ou vendre le journal? Et bien c&apos;est ici!</p>
            </header>
        </div>
        {/* Journal */}
        <section id="journal" className="container-size py-section flex flex-wrap gap-10 justify-around items-center">
            <article className='max-w-xl flex flex-col gap-5'>
                <h2 className='h2 text-center'>Vendre le journal:</h2>
                <p className='max-w-[45ch]'>Tu souhaites vendre le journal du Carnaval ? C&apos;est super ! Comment ça se passe?</p>
                <ul className='list-disc list-inside'>
                    <li>Chaque journal est vendu <strong>CHF 5.-</strong></li>
                    <li><strong>Tu gagnes 1.- par journal</strong> vendu. Si tu reçois de l&apos;argent en plus, il est pour toi.</li>
                    <li>Si tu n&apos;as pas tout vendu, <strong>tu dois ramener les journaux qui te restent</strong>. On t&apos;aidera à faire le calcul de ce que tu dois rendre et de ce que tu as gagné.</li>
                    <li>Tu dois rapporter les invendus et l&apos;argent <strong>au plus tard le mercredi 14 février 2024 !</strong></li>
                </ul>
                <p className='h3 text-center'>Les O meilleurs vendeur seront recompensé!</p>
                <h3 className='h3'>S&apos;inscrire</h3>
                <div>
                    <p>Avant toutes choses, tu dois <strong>avoir plus de 10ans</strong> et <strong>tes parents doivent être d&apos;accord!</strong></p>
                    <p>Tour bon? alors remplis le formulaire petit vendeur disponible <Link href="#" target='_blanck' className='url'>ici</Link></p>
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
        <section id="stands" className="container-size py-section flex-center">
            <article className='max-w-xl flex-center flex-col gap-5 text-center'>
                <h2 className='h2'>Demande de stand exterieur</h2>
                <p>
                    Tu souhaite obtenir un stand exterieur pendant le carnaval? remplis le formulaire disponible ci dessous et envoie le à l&apos;adresse suivante: <br />
                    Carnaval de Monthey, Case postale 423, 1870 Monthey
                </p>
                <Button variant="gradient">
                    Télécharger le formulaire
                </Button>
            </article>
        </section>
        {/* Contact form */}
        <section id="contact" className="container-size py-section flex flex-col">
            <h2 className='h2'>Autre chose? ecrit nous:</h2>
            <form className='flex-center flex-col gap-5' onSubmit={sendContact}>
                <div className='flex gap-x-10 gap-y-5 flex-wrap w-full'>
                    <FormInput
                        name='name'
                        label='Votre nom:'
                        placeholder='Nom et Prénom'
                        type='text'
                        className="w-[40ch] grow"
                        autoComplete='name'
                    />
                    <FormInput
                        name='mail'
                        label='Votre E-mail:'
                        placeholder='exemple@mail.com'
                        type='email'
                        className="w-[40ch] grow"
                        autoComplete='email'
                    />
                </div>
                <FormInput
                    name='subject'
                    label='Sujet:'
                    placeholder='Décrivez votre demande'
                    type='text'
                    autoComplete='off'
                />
                <FormInput
                    name='message'
                    label='Message:'
                    placeholder='Votre message'
                    type='textarea'
                />
                <Button variant="gradient" type='submit'>
                    Envoyer
                </Button>
            </form>
        </section>
        </>
    );
};

export default Contact;