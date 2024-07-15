import EventsList from '@components/events/EventsList';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import map from "@public/images/map-parking.jpg";
import theme from "@public/images/theme.jpg";

const Infos = () => {
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Toutes les infos</h1>
                <p className='h2 text-snow text-center max-w-4xl'>On vous attend du OO février au OO mars OOOO pour la OOOème édition</p>
            </header>
        </div>
        {/* Entries pricing */}
        <section id="entries" className="container-size py-section flex text-center flex-wrap gap-10 justify-around">
        <h2 className='h2 w-full'>Prix des entrées</h2>
            <article>
                <h3 className='h3'>Espace triboulet</h3>
                <ul>
                    <li>Costumés et masqué: 10.-</li>
                    <li>Non masqué: 15.-</li>
                    <li>Et le mardi, c&apos;est gratuit!</li>
                </ul>
            </article>
            <article>
                <h3 className='h3'>Cortège du dimanche</h3>
                <ul>
                    <li>Entrée au cortège: 10.-</li>
                    <li>Enfants jusqu&apos;à 15 ans: GRATUIT</li>
                </ul>
            </article>
        </section>
        {/* Theme of the year */}
        <section id="theme" className='container-size py-section'>
            <article className='w-fit mx-auto text-center pb-5'>
                <h2 className='h2 mb-5'>Le thème OOOO</h2>
                <p>
                    Le Carnaval de Monthey c&apos;est... <br />
                    L&apos;esprit indomptable capturé par ceux qui osent être différents et légendaires; <br />
                    L&apos;impact frénétique qui s&apos;érige dans la ville et fait capoter la logique; <br />
                    L&apos;emblématique Triboulet rougeoyant qui tourneboule en enivrant la foule; <br />
                    L&apos;empreinte un tantinet débile qui laisse une trace indélébile; <br />
                    
                </p>
                <p>
                    <strong>Cette année, bambochons en toute simplicité à</strong>
                </p>
            </article>
            <article className='flex flex-wrap w-full justify-center items-center gap-5 my-5'>
                <div className='min-w-[25rem] max-w-[35rem] flex-1'>
                    <h3 className="h2 w-full mobile:text-center"><i className='text-gradient'>L&apos;iconique</i> carnaval de Monthey</h3>
                </div>
                <div className='min-w-[15rem] max-w-[22rem] flex-1'>
                    <Image
                        src={theme}
                        alt="Affiche Thème du carnaval"
                        className="max-w-full object-contain"
                    />
                </div>
            </article>
        </section>
        {/* event for the carnaval */}
        <section id="calendar" className="py-section flex flex-col gap-8">
            <h2 className='h2 container-size'>Agenda</h2>
            <EventsList />
        </section>
        {/* transport infos */}
        <section id="transport" className="container-size py-section flex flex-col gap-8">
            <h2 className='h2'>Infos transports</h2>
            <article>
                <h3 className='h3'>Parking voitures</h3>
                <Image
                    src={map}
                    alt="Carte parking voiture"
                    className="max-w-full object-contain"
                />
            </article>
            <article>
                <h3 className='h3'>Ligne de bus</h3>
                <p className='max-w-[60ch]'>
                    Grâce aux TPC, un bus sera inclus avec le prix du cortège pour faire la liaison entre les parkings et le cortège!
                </p>
                <p>parkings -&gt;  cortège, Toutes les 20min de 11h à 14h:</p>
                Collombey, centre commercial
                <ul className='list-disc pl-5'>
                    <li>Collombey, centre commercial</li>
                    <li>Monthey, parking patinoire</li>
                    <li>Monthey, parking site chimique</li>
                    <li>Monthey, place d&apos;arme</li>
                    <li>Collombey, centre commercial</li>
                </ul>
                <p>cortège -&gt;  parkings, Toutes les 20min de 16h à 18h:</p>
                Collombey, centre commercial
                <ul className='list-disc pl-5'>
                    <li>Monthey, place d&apos;arme</li>
                    <li>Monthey, parking site chimique</li>
                    <li>Monthey, parking patinoire</li>
                    <li>Collombey, centre commercial</li>
                    <li>Monthey, place d&apos;arme</li>
                </ul>
                <p>
                    Plan de circulation détaillé disponible&nbsp;
                    <Link href="#" className='url'>
                        ici
                    </Link>
                </p>
            </article>
        </section>
        </>
    );
};

export default Infos;