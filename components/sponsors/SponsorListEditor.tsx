"use client"
import { FormEvent, useEffect, useState } from 'react';
import FormInput from '@components/FormInput';
import { Button } from '@components/ui/button';
import EditBtn from '@components/EditBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteSponsor, addSponsor } from './action';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { notification } from '@utils/notifications';

const initialState = {
    message: "",
}

const SponsorListEditor = ({ sponsors }: {sponsors: { id:string, alt:string }[]}) => {
    const router = useRouter();
    const [ fileLabel, setFileLabel ] = useState(`Logo du sponsor`);
    const [state, formAction] = useFormState(addSponsor, initialState);

    useEffect(() => {
        if (state.message === "success") {
            notification("success", "Sponsor ajouté.");
            router.refresh();
        } else if (state.message !== "") notification("error", state.message);
    }, [state, router])

    const toggleEditForm = () => document.querySelector(`[data-target="sponsors-editor"]`)?.classList.toggle("hidden");

    function updateFileLabel(e: FormEvent) {
        if (!("id" in e.target) || e.target.id !== "sponsor-image") return;
        if (!("files" in e.target)) return;
        const files = e.target.files as FileList;
        setFileLabel((currentState) => files[0].name.slice(0, currentState.length - 3) + " ...")
        console.log(files[0].name)
    }
    
    async function handleDelete(sponsor:{ id:string, alt:string }) {
        const result = await deleteSponsor(sponsor.id);
        if (result.success) router.refresh();
        else console.log(result.error);
    }

    return (
        <>
            <EditBtn onClick={toggleEditForm} />
            <div className='fixed z-50 hidden absolute-center text-lg font-sans container-size flex-center flex-col modal-bg' data-target={`sponsors-editor`}>
                <button className='absolute right-[1em] top-[1em]' onClick={toggleEditForm} aria-label='Fermer le menu'>
                    <FontAwesomeIcon icon={faXmark} className='text-3xl' />
                </button>
                <h3 className="h4 py-5">Supprimer un sponsor</h3>
                <div className='grid gap-3 max-h-[8em] overflow-y-scroll px-5'>
                    {sponsors.map((sponsor, i) => (
                        <div key={i} className='flex justify-between gap-3'>
                            <span>{sponsor.alt}</span>
                            <button onClick={() => {handleDelete(sponsor)}} aria-label='Supprimer'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    ))}
                </div>
                <h3 className="h4 py-5">Ajouter un sponsor</h3>
                <form action={formAction} onChange={updateFileLabel} className='flex-center flex-col gap-5'>
                    <FormInput
                        name='sponsor-name'
                        label={`Nouveau sponsor`}
                        placeholder='Nom du sponsor'
                        type='text'
                        autoComplete='none'
                    />
                    <FormInput
                        name='sponsor-image'
                        label={fileLabel}
                        accept="image/*"
                        type='file'
                    />
                    <div className="flex gap-3">
                        <Button variant="gradient" type='submit'>
                            Valider
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SponsorListEditor;