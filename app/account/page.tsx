"use client"
import React, { FormEvent, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from '@components/ui/button';
import FormInput from '@components/FormInput';
import { useRouter } from 'next/navigation';
import { notification } from '@utils/notifications';
import parseErrors from '@utils/parseErrors';
import { UpdateAccount, changeRights, deleteAccount, getMail } from './action';

const Account = () => {
    const router = useRouter();
    const { status, data } = useSession();
    const [mail, setMail] = useState("");

    useEffect(() => {
        (async () => {
            if (!data) return;
            const { user } : {
                user: {
                    _id: string,
                    username: string,
                    right: number
                } | undefined
            } = data as any;
            if (user) setMail(await getMail(user._id));
        })();
    }, [data]);
    
    async function updateUser(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        try {
            if (form.get("password") && form.get("password") !== form.get("password-confirm")) throw new Error("vérifie d'avoir bien écrit ton mot de passe");
            let entries: { username?:string, mail?:string, password?:string, checkPassword:string } = { checkPassword: form.get("identity-confirm") as string};
            if (form.get("username")) entries["username"] = form.get("username") as string;
            if (form.get("mail")) entries["mail"] = form.get("mail") as string;
            if (form.get("password")) entries["password"] = form.get("password") as string;
            const result = await UpdateAccount(entries);
            if (!result.success) throw new Error(result.error);
            const status = await signIn('credentials-login', {
                mail: form.get('mail'),
                password: form.get('password') || form.get("identity-confirm"),
                redirect: false,
            });
            if (!status) throw new Error("Oups, ça n'as pas marché, merci de réessayer.")
            if (status && status.error) throw new Error("Identifiants invalides.")
            notification("success", "compte mit a jour avec succès")
            router.refresh();
        } catch (err) {
           notification("error", parseErrors(err))
        }
    }

    async function setRight(e: FormEvent) {
        e.preventDefault()
        const form = new FormData(e.target as HTMLFormElement);
        try {
            const data = {
                target: form.get("user") as string,
                right: parseInt(form.get("right") as string)
            };
            const result = await changeRights(data);
            if (!result.success) throw new Error(result.error);
            notification("success", "Droits mis à jour avec succès.");
        } catch (err) {
            notification("error", parseErrors(err));
        }
    }

    async function deleteBtn() {
        try {
            const passwordInput = document.getElementById("identity-confirm") as HTMLInputElement;
            const result = await deleteAccount({ checkPassword: passwordInput.value });
            if (!result.success) throw new Error(result.error);
            await signOut();
            router.push("/");
            notification("success", "Compte supprimé avec succès.");
        } catch(err) {
           notification("error", parseErrors(err));
        }
    }

    if (status === 'loading') return (<></>);
    else if (status === "authenticated") {
        const { user } : {
            user: {
                _id: string,
                username: string,
                right: number
            } | undefined
        } = data as any;
        if (!user) return router.push("/");
        return (
            <>
            {/* header */}
            <div className='bg-dark'>
                <header className='header'>
                    <h1 className="h1 text-gradient text-center">Salut {user.username}</h1>
                    <p className='h2 text-snow text-center max-w-4xl'>Gestion du compte</p>
                </header>
            </div>
            <form className='flex-center flex-col gap-5 container-size max-w-lg py-section' onSubmit={updateUser}>
                <h2 className="h3">Mettre à jour tes infos</h2>
                <p>Laisse vide ce que tu ne veux pas changer</p>
                <FormInput
                    name='username'
                    label='Nom d&apos;utilisateur:'
                    placeholder='Ton nom d&apos;utilisateur'
                    type='text'
                    autoComplete='username'
                    value={user.username}
                />
                <FormInput
                    name='mail'
                    label='E-mail:'
                    placeholder='exemple@mail.com'
                    type='email'
                    autoComplete='email'
                    value={mail}
                />
                <FormInput
                    name='password'
                    label='Nouveau mot de passe:'
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
                <FormInput
                    name='identity-confirm'
                    label='Confirme que c&apos;est toi! (requis)'
                    placeholder='Ton mot de passe actuel'
                    type='password'
                    autoComplete='off'
                />
                <div className="flex-center gap-5 flex-wrap">
                    <Button variant="gradient" type='submit'>
                        Valider
                    </Button>
                    <Button variant="default" type='button' onClick={deleteBtn}>
                        Supprimer le compte
                    </Button>
                    <Button variant="default" type='button' onClick={async () => {await signOut(); router.push("/")}}>
                        Se deconnecter
                    </Button>
                </div>
            </form>
            {user.right > 2 && <>
                <h2 className="h2 text-center w-full">Zone admin</h2>
            <form className='flex-center flex-col gap-5 container-size max-w-lg py-section' onSubmit={setRight}>
                <h2 className="h3">Changer les droits</h2>
                <FormInput
                    name='user'
                    label='Cible:'
                    placeholder='nom d&apos;utilisateur, mail, ou identifiant'
                    type='text'
                    autoComplete='none'
                />
                <FormInput
                    name='right'
                    label='Droit:'
                    placeholder='(0: user normal; 1: changer le contenu; 2: super-admin)'
                    type='number'
                    value={mail}
                />
                <div className="flex-center gap-5 flex-wrap">
                    <Button variant="gradient" type='submit'>
                        Valider
                    </Button>
                </div>
            </form>
            </>}
            </>
        );

    }
    else {router.push("/")};
}
        
export default Account;