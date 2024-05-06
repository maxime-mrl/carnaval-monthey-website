import EventsList from '@components/EventsList';
import Image from 'next/image';
import React from 'react';

import map from "@public/images/map-parking.jpg";
import Link from 'next/link';

const InfoPage = () => {
    const thurdsdayEvent = [
        {
            title: "Event Title",
            Time: "OOhOO",
            place: "Event place",
            infos: null,
        },
        {
            title: "Event Title",
            Time: "OOhOO",
            place: "Event place",
            infos: "() => {}",
        },
        {
            title: "Event Title",
            Time: "OOhOO",
            place: "Event place",
            infos: null,
        },
        {
            title: "Event Title",
            Time: "OOhOO",
            place: "Event place",
            infos: null,
        }
    ]
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='pt-24 pb-10 flex-center flex-col gap-10 container-size'>
                <h1 className="h1 text-gradient text-center">Toutes les infos</h1>
                <h2 className='h2 text-snow text-center max-w-4xl'>On vous attend du OO février au OO mars OOOO pour la OOOème édition </h2>
            </header>
        </div>
        {/* Entries pricing */}
        <section id="entries" className="container-size py-10 flex text-center flex-wrap gap-10 justify-around">
        <h2 className='h2 w-full'>Prix des entrées</h2>
            <article>
                <h3 className='h3'>Espace triboulet</h3>
                <ul>
                    <li>Costumés et masqué: 10.-</li>
                    <li>Non masqué: 15.-</li>
                    <li>Et le mardi, c’est gratuit!</li>
                </ul>
            </article>
            <article>
                <h3 className='h3'>Cortège du dimanche</h3>
                <ul>
                    <li>Entrée au cortège: 10.-</li>
                    <li>Enfants jusqu’à 15 ans: GRATUIT</li>
                </ul>
            </article>
        </section>
        <section id="calendar" className="py-10 flex flex-col gap-8">
            <div className="container-size">
                <h2 className='h2 mb-4'>Agenda</h2>
                <h3 className='h3'>Jeudi OO février</h3>
            </div>
            <EventsList events={thurdsdayEvent} />
            <div className="container-size">
                <h3 className='h3'>Vendredi OO février</h3>
            </div>
            <EventsList />
            <div className="container-size">
                <h3 className='h3'>Samedi OO mars</h3>
            </div>
            <EventsList />
            <div className="container-size">
                <h3 className='h3'>Dimanche OO mars</h3>
            </div>
            <EventsList />
        </section>
        
        <section id="transport" className="container-size py-10 flex flex-col gap-8">
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
                    Grâce aux TPC, un bus seras inclus avec le prix du cortège pour faire la liaison entre les parking et le cortège!
                </p>
                <p>parkings -&gt;  cortège, Toutes les 20min de 11h à 14h:</p>
                Collombey, centre commercial
                <ul className='list-disc pl-5'>
                    <li>Collombey, centre commercial</li>
                    <li>Monthey, parking patinoire</li>
                    <li>Monthey, parking site chimique</li>
                    <li>Monthey, place d’arme</li>
                    <li>Collombey, centre commercial</li>
                </ul>
                <p>cortège -&gt;  parkings, Toutes les 20min de 16h à 18h:</p>
                Collombey, centre commercial
                <ul className='list-disc pl-5'>
                    <li>Monthey, place d’arme</li>
                    <li>Monthey, parking site chimique</li>
                    <li>Monthey, parking patinoire</li>
                    <li>Collombey, centre commercial</li>
                    <li>Monthey, place d’arme</li>
                </ul>
                <p>
                    Plan de circulation détaillé disponible&nbsp;
                    <Link href="#">
                        ici
                    </Link>
                </p>
            </article>
        </section>
        </>
    );
};

export default InfoPage;