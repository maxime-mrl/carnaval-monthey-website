"use client"
import React, { FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Link from 'next/link';

import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { useRouter } from 'next/navigation';
import register from './action';

const InfoPage = () => {
    const router = useRouter();
    const { status } = useSession();

    
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        if (!form.get("mail") || !form.get("password") || !form.get("username") || !form.get("password-confirm")) {
            // handle error later
            return;
        };
        if (form.get("password") !== form.get("password-confirm")){
            // handle error later
            return;
        }
        const registerStatus = await register({
            mail: form.get("mail") as string,
            password: form.get("password") as string,
            username: form.get("username") as string,
        });
        if (registerStatus.success) await signIn('credentials', {
            mail: form.get('mail'),
            password: form.get('password'),
            callbackUrl: '/',
        }); else {
            // handle error later
        }
    }


    if (status === 'loading') return (<></>);
    else if (status === "authenticated") router.push("/");
    else return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">S&apos;inscrire</h1>
            </header>
        </div>
        <form className='flex-center flex-col gap-5 container-size max-w-lg py-section' onSubmit={handleSubmit}>
            <FormInput
                name='username'
                label='Nom d&apos;utilisateur:'
                placeholder='Ton nom d&apos;utilisateur'
                type='text'
                autoComplete='username'
            />
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
                placeholder='Un truc super secret!'
                type='password'
                autoComplete='new-password'
            />
            <FormInput
                name='password-confirm'
                label='Confrmation du mot de passe:'
                placeholder='Le même truc super secret'
                type='password'
                autoComplete='off'
            />
            <p>Tu as déjà un compte? <Link href={"/login"} className='url'>Connecte toi.</Link></p>
            <Button variant="gradient" type='submit'>
                S&apos;inscrire
            </Button>
        </form>
        </>
    );
};


export default InfoPage;