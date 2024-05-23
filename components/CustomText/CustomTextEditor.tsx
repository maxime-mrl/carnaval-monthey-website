"use client"
import { FormEvent } from 'react';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormInput from '@components/FormInput';
import { Button } from '@components/ui/button';
import editCustomText from './action';

const CustomTextEditor = ({ id } : { id:string }) => {
    const toggleEditForm = () => document.querySelector(`[data-target="${id}-editor"]`)?.classList.toggle("hidden");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const text = form.get("custom-text") as string | null;
        if (!text) {
            // handle error later
            return;
        };
        if (await editCustomText({ identifier:id, text })) {
            window.location.reload();
        } else {
            console.log("erreur");
        }
    }
    return (
        <>
            <button
                className="absolute right-[-0.5em] top-[-0.8em] cursor-pointer"
                onClick={toggleEditForm}
            >
                <FontAwesomeIcon className="bg-arylide bg-opacity-70 text-[1.5rem] p-[0.4em] rounded-[50%]" icon={faPenToSquare} />
            </button>
            <div className='fixed z-50 hidden absolute-center text-lg font-sans w-full' data-target={`${id}-editor`}>
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-10 container-size bg-dark bg-opacity-60 backdrop-blur-lg p-[3em] rounded-xl border-burnt/15 border-solid border-[4px] drop-shadow-3xl'>
                    <FormInput
                        name='custom-text'
                        label={`Editer le texte ${id}`}
                        placeholder='nouveau texte'
                        type='text'
                        autoComplete='none'
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