"use client"
import React, { FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Link from 'next/link';

import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { useRouter } from 'next/navigation';

const InfoPage = () => {
    const router = useRouter();
    const { status } = useSession();

    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        await signIn('credentials', {
            mail: form.get('mail'),
            password: form.get('password'),
            callbackUrl: '/',
        });
    }


    if (status === 'loading') return (<></>);
    else if (status === "authenticated") router.push("/");
    else return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Se connecter</h1>
            </header>
        </div>
        <form className='flex-center flex-col gap-5 container-size max-w-lg py-section' onSubmit={handleSubmit}>
            <FormInput
                name='mail'
                label='E-mail:'
                placeholder='exemple@mail.com'
                type='email'
                autoComplete='email'
            />
            <FormInput
                name='password'
                label='Mot de passe:'
                placeholder='Ton mot de passe'
                type='password'
                autoComplete='current-password'
            />
            <p>Pas encore inscrit? <Link href={"/register"} className='url'>Règle ça tout de suite.</Link></p>
            <Button variant="gradient" type='submit'>
                Se connecter
            </Button>
        </form>
        </>
    );
};


export default InfoPage;