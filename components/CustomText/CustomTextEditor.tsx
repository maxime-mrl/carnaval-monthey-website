"use client"
import { FormEvent } from 'react';
import FormInput from '@components/FormInput';
import { Button } from '@components/ui/button';
import editCustomText from './action';
import EditBtn from '@components/EditBtn';
import { useRouter } from 'next/navigation';
import { notification } from '@utils/notifications';

const CustomTextEditor = ({ id, text } : { id:string, text:string }) => {
    const router = useRouter();

    const toggleEditForm = () => document.querySelector(`[data-target="${id}-editor"]`)?.classList.toggle("hidden");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const text = form.get("custom-text") as string | null;
        if (!text) return notification("error", "Texte invalide");
        if (await editCustomText({ identifier:id, text })) {
            router.refresh();
            toggleEditForm();
            notification("success", "C'est fait!");
        } else {
            notification("error", "Impossible de modifier le texte.");
        }
    }
    return (
        <>
            <EditBtn onClick={toggleEditForm} />
            <div className='fixed z-50 hidden absolute-center text-lg font-sans w-full' data-target={`${id}-editor`}>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10 container-size modal-bg'>
                    <FormInput
                        name='custom-text'
                        label={`Editer le texte ${id}`}
                        placeholder='nouveau texte'
                        type='text'
                        autoComplete='none'
                        value={text}
                    />
                    <div className="flex gap-3">
                        <Button variant="gradient" type='submit'>
                            Valider
                        </Button>
                        <Button type='button' onClick={toggleEditForm}>
                            Annuler
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CustomTextEditor;