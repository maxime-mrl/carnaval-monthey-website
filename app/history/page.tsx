import Image from 'next/image';

import prince from "@public/images/portrait-prince.jpg";
import Link from 'next/link';

const HistoryPage = async () => {
    return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Nos traditions</h1>
                <p className='h2 text-snow text-center max-w-4xl'>Et oui, depuis OOOans il en faut bien!</p>
            </header>
        </div>
        {/* princes section */}
        <section id="prince" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Le prince</h2>
            <p className='max-w-[50ch]'>
                La tradition est de nommer tous les ans un prince ou une princesse qui représentera le carnaval et notre ville pour chaque édition. Nous nous souviendrons en tout temps de sa grandeur et bonté. Nous les appelons aussi Miss Carnaval et Miss Pimponicaille
            </p>
            <div className='flex flex-wrap w-full justify-center items-center gap-5 my-5'>
                <article className='min-w-[25rem] max-w-[35rem] flex-1 text-left mobile:text-center'>
                    <h3 className='h3 mb-5'>Le OOOeme Prince:</h3>
                    <p>
                        Arrivé à Monthey le jour de sa naissance, Christophe 1er devient résolument actif dans à peu près tout ce que fait notre cité.
                        Toujours  prêt, il suit les traces de la famille et s&apos;engage tout petit dans les  scouts, mais pas juste le petit scout. <br /> Dauphin Discret gravit les grades  jusqu&apos;à devenir président des anciens, l&apos;âge venu. Evidemment, le  foulard jaune et vert ne lui suffit pas car Monthey, il l&apos;aime! Il ne  se gêne donc pas d&apos;entrer dans moults comités pour animer et faire  connaître notre cité aux alentours: comité des FOJE, comité de  Monthey2025, bien d&apos;autres, et surtout le Comité du Carnaval de  Monthey! <br />
                        Historiquement, Christophe 1er  commence ses activités carnavalesques comme constructeur et animateur  de chars, en 1985. Puis, ayant la plume facile et l&apos;esprit taquin, il  rejoint les rangs du Bout&apos;Rions. En 1998, la tente de scout devenant  bien trop petite, il décide de devenir responsable de la cantine du  Carnaval en intégrant le Comité d&apos;organisation: il a désormais sa  Grande Tente! Il la chouchoute pendant 21 ans, ne la quittant quasiment  jamais de toute la fête. <br />
                        Durant  toutes ces années, son rôle de cantinier prend une tout autre ampleur,  le vendredi soir à minuit pile, lors de l&apos;élection des miss. Tel Léonard  de Vinci, Christophe 1er crée et gère les algorithmes  rudement complexes de la Machine à Miss, tenant dans sa main droite les  codes secrets permettant un résultat sans faille. <br />
                        Aujourd&apos;hui,  le voilà hissé au rôle d&apos;acteur principal de notre Carnaval où sa  polyvalence est mise à l&apos;épreuve: se rouler-bouler avec les enfants  dans les confettis, se tortiller sur la chenille avec les aînés, jauger  les plus iconiques masques aux concours, se laisser porter aux cortèges,  et surtout jouir de l&apos;aura princière. <br />
                        Mais ne dévoilons pas plus de la vie de notre futur Prince, le Bout&apos;Rions du mercredi 07 février s&apos;en chargera …
                    </p>
                </article>
                
                <article className='min-w-[15rem] max-w-[22rem] flex-1'>
                    <Image
                        src={prince}
                        alt="Affiche du Prince"
                        className="max-w-full object-contain"
                    />
                </article>
            </div>
            <article>
                <h3 className='h3'>Les anciens princes</h3>
                <ul>
                    {/* will work on it later */}
                    <li>2023 Vernaz Nathalie et Philippe dit Nat 1ère et Pipo 1er</li>
                    <li>2022 Pas de prince ni de miss suite à la pandémie COVID-19</li>
                    <li>2021 Pas de prince ni de miss suite à la pandémie COVID-19</li>
                    <li>2020 Paunet Bernard dit Bernard 1er</li>
                    <li>2019 Mauron Nadine dit Nadine 1ère</li>
                    <li>2018 Mottola Rosy dit Rozy 1ère</li>
                    <li>2017 Profilo Claudio dit Claudio 1er</li>
                    <li>2016 Pasche Daniel dit Daniel 1er</li>
                    <li>2015 Forny Ferdinand dit Freddy 1er</li>
                </ul>
            </article>
        </section>
        {/* themes history */}
        <section id="themes" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Les thèmes</h2>
            <p className='max-w-[50ch]'>
                Depuis de nombreuses années, nous définissons un thème de carnaval, qui nous guideras dans nos actions, idées, et choix, durant tout ce magnifique événement!
            </p>
            <article>
                <h3 className='h3'>Les anciens thèmes</h3>
                <ul>
                    {/* will work on it later */}
                    <li>2023 	Un Monstre Carnaval 	du 16 février au 21 février 	150ème Carnaval de Monthey</li>
                    <li>2020 	Monthey ressort ! 	du 24 février au 1er mars 	149ème Carnaval de Monthey</li>
                    <li>2021 	Un Carnaval à la maison ! 	du 12 février au 14 février 	LA NON-ÉDITION !!!</li>
                    <li>2020 	Un Carnaval à la Renverse ! 	du 20 février au 25 février 	148ème Carnaval de Monthey</li>
                    <li>2019 	Mon Carnaval s&apos;affiche ! 	du 28 février au 5 mars 	147ème Carnaval de Monthey</li>
                    <li>2018 	Un Carnaval Bestial 	du 8 février au 13 février 	146ème Carnaval de Monthey</li>
                    <li>2017 	Un Carnaval &quot;Au sommet&quot; 	du 23 février au 28 février 	145ème Carnaval de Monthey</li>
                    <li>2016 	Un Carnaval &quot;De toute urgence&quot; 	du 4 février au 9 février 	144ème Carnaval de Monthey</li>
                </ul>
            </article>
        </section>
        {/* public prizes history history */}
        <section id="themes" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Bistrots et cantines primés</h2>
            <article>
                <h3 className='h3'>Les bistrots:</h3>
                <ul>
                    {/* will work on it later */}
                    <li>2020 Havana Café</li>
                    <li>2019 Plic Café</li>
                    <li>2018 Kekett&apos;s Bar</li>
                    <li>2017 Plic Café</li>
                    <li>2016 Café de la Banque</li>
                    <li>2015 Plic Café</li>
                    <li>2014 Plic Café</li>
                    <li>2013 Café du Commerce</li>
                    <li>2012 Café du Commerce</li>
                    <li>2011 Café de la Banque</li>
                    <li>2010 Café de la Paix</li>
                    <li>2009 Café de la Paix</li>
                    <li>2008 Café de la Banque</li>
                    <li>2007 Havana Bar</li>
                    <li>2006 Café de la Banque</li>
                    <li>2005 Café de la Banque</li>
                    <li>2004 Central Pub</li>
                    <li>2003 Café de la Place</li>
                    <li>2002 Bar du Château</li>
                </ul>
            </article>
            <article>
                <h3 className='h3'>Les bars de la cantine:</h3>
                aaaa
            </article>
        </section>
        {/* bout'rions archive */}
        <section id="journal" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Le journal</h2>
            <article>
                <h3 className='h3'>Historique des logos</h3>
                <ul>
                    {/* will work on it later */}
                </ul>
            </article>
            <article>
                <h3 className='h3'>Archive</h3>
                <ul>
                    {/* will work on it later */}
                </ul>
            </article>
        </section>
        <section id="journal" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Album photo</h2>
            <p>Tu te sens encore nostalgique?</p>
            <Link href={"http://carnavaldemonthey.com.vtxhosting.ch/igalerie/"} target='_blank'>L&apos;album de toutes les photos consérvées du carnaval est disponible ici</Link>
        </section>
        </>
    );
};

export default HistoryPage;