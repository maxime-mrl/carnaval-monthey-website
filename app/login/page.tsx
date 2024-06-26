"use client"
import React, { FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Link from 'next/link';

import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { useRouter } from 'next/navigation';
import { notification } from '@utils/notifications';
import parseErrors from '@utils/parseErrors';

const Login = () => {
    const router = useRouter();
    const { status } = useSession();

    // log-in user
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        try {
            // try to log-in
            const status = await signIn('credentials-login', {
                mail: form.get('mail'),
                password: form.get('password'),
                redirect: false,
            });
            // throw potentials errors
            if (!status) throw new Error("Oups, ça n'as pas marché, merci de réessayer.");
            if (status && status.error) throw new Error("Identifiants invalides.");
            // success
            notification("success", "Bon retour parmis nous!");
            (() => {router.push("/")})();
        } catch (err:any) {
           notification("error", parseErrors(err))
        }
    }


    if (status === 'loading') return (<></>);
    else if (status === "authenticated") (() => {router.push("/")})();
    else return (
        <>
        {/* header */}
        <div className='bg-dark'>
            <header className='header'>
                <h1 className="h1 text-gradient text-center">Se connecter</h1>
            </header>
        </div>
        {/* login form */}
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

export default Login;