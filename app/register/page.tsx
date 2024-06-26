"use client"
import { FormEvent } from 'react';
import { signIn, useSession } from 'next-auth/react';

import Link from 'next/link';

import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { useRouter } from 'next/navigation';
import register from './action';
import { notification } from '@utils/notifications';
import parseErrors from '@utils/parseErrors';

const Register = () => {
    const router = useRouter();
    const { status } = useSession();

    // register user
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        try {
            // check that everythin is here
            if (!form.get("mail") || !form.get("password") || !form.get("username") || !form.get("password-confirm")) throw new Error("Merci de remplir tout les champs.");
            // check password / confirm pass match
            if (form.get("password") !== form.get("password-confirm")) throw new Error("Vérifie ton mot de passe!");
            // try to create account
            const registerStatus = await register({
                mail: form.get("mail") as string,
                password: form.get("password") as string,
                username: form.get("username") as string,
            });
            // login form localstorage or throw error
            if (registerStatus.success) await signIn('credentials', {
                mail: form.get('mail'),
                password: form.get('password'),
                callbackUrl: '/',
            }); else throw new Error(registerStatus.error ?? "Impossible de créer un compte");
        } catch (err:any) {
            notification("error", parseErrors(err));
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


export default Register;