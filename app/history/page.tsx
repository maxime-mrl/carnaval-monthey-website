import Image from 'next/image';

import prince from "@public/images/portrait-prince.jpg";
import Link from 'next/link';
import List from '@components/list/List';
import CustomText from "@components/CustomText/CustomText";

const History = async () => {
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
                    <h3 className='h3 mb-5'>
                        <CustomText id={"prince-history"} />
                    </h3>
                    <div>
                        <CustomText id={"prince-history-text"} />
                    </div>
                </article>
                
                <article className='min-w-[15rem] max-w-[22rem] flex-1'>
                    <Image
                        src={prince}
                        alt="Affiche du Prince"
                        className="max-w-full object-contain"
                    />
                </article>
            </div>
            <article className='container-size'>
                <h3 className='h3'>Les anciens princes</h3>
                <List identifier='princes' />
            </article>
        </section>
        {/* themes history */}
        <section id="themes" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Les thèmes</h2>
            <p className='max-w-[50ch]'>
                Depuis de nombreuses années, nous définissons un thème de carnaval, qui nous guideras dans nos actions, idées, et choix, durant tout ce magnifique événement!
            </p>
            <article className='container-size'>
                <h3 className='h3'>Les anciens thèmes</h3>
                <List identifier='themes' />
            </article>
        </section>
        {/* public prizes history */}
        <section id="bistrots" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Bistrots et cantines primés</h2>
            <article>
                <h3 className='h3'>Les bistrots:</h3>
                <List identifier='bistrots' />
            </article>
            <article>
                <h3 className='h3'>Les bars de la cantine:</h3>
                <List identifier='cantine' />
            </article>
        </section>
        {/* Image album */}
        <section id="images" className="container-size py-section text-center flex flex-col gap-10 justify-around items-center">
            <h2 className='h2 w-full'>Album photo</h2>
            <p>Tu te sens encore nostalgique?</p>
            <Link href={"http://carnavaldemonthey.com.vtxhosting.ch/igalerie/"} target='_blank' className='url'>L&apos;album de toutes les photos consérvées du carnaval est disponible ici</Link>
        </section>
        </>
    );
};

export default History;