"use client"

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { notification } from '@utils/notifications';
import { addEvent, deleteEvent } from './action';
import FormInput from '@components/FormInput';
import { Button } from '@components/ui/button';
import EditBtn from '@components/EditBtn';

const initialState = {
    message: "",
}

const EventListEditor = ({ events }: {events: null | string[][]}) => {
    const router = useRouter();
    // handle update form
    const [state, formAction] = useFormState(addEvent, initialState);

    // listen for notifications
    useEffect(() => {
        if (state.message === "success") {
            notification("success", "événement ajouté.");
            router.refresh();
        } else if (state.message !== "") notification("error", state.message);
    }, [state, router]);

    // show or hide edit form
    const toggleEditForm = () => document.querySelector(`[data-target="events-editor"]`)?.classList.toggle("hidden");
    
    // handle delete form
    async function handleDelete(event:string) {
        const result = await deleteEvent(event);
        if (result.success) {
            notification("success", "événement supprimé.");
            router.refresh();
        }
        else notification("error", result.error ? result.error : "Erreur inconnue");
    }

    return (
        <>
            <EditBtn onClick={toggleEditForm} />
            <div className='fixed z-50 hidden absolute-center text-lg font-sans container-size modal-bg max-h-[80vh] overflow-auto' data-target={`events-editor`}>
                <button className='absolute right-[1em] top-[1em]' onClick={toggleEditForm} aria-label='Fermer le menu'>
                    <FontAwesomeIcon icon={faXmark} className='text-3xl' />
                </button>
                <h3 className="h4 py-5">Supprimer un événement</h3>
                <div className='grid gap-3 max-h-[8em] overflow-y-scroll px-5'>
                    {events && events.map((event, i) => (
                        <div key={i} className='flex justify-between gap-3'>
                            <span>{event[0]},</span>
                            <span>{event[1]}</span>
                            <button onClick={() => {handleDelete(event[1])}} aria-label='Supprimer'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    ))}
                </div>
                <h3 className="h4 py-5">Ajouter un événement</h3>
                <form action={formAction}  className='flex-center flex-col gap-5'>
                    <FormInput
                        name='event-day'
                        label={`Jour`}
                        placeholder='Le jour tel qu&apos;affiché'
                        type='text'
                        autoComplete='none'
                    />
                    <FormInput
                        name='event-name'
                        label={`Nom de l'événement`}
                        placeholder='Un super événement'
                        type='text'
                        autoComplete='none'
                    />
                    <FormInput
                        name='event-time'
                        label={`Heure de l'événement`}
                        placeholder='14h30'
                        type='text'
                        autoComplete='none'
                    />
                    <FormInput
                        name='event-place'
                        label={`Lieux de l'événement`}
                        placeholder='Lieux'
                        type='text'
                        autoComplete='none'
                    />
                    <FormInput
                        name='event-infos'
                        label={`Lien d'infos suplémentaires (optionnel)`}
                        placeholder='Le lien pour un pdf, une page facebook etc'
                        type='text'
                        autoComplete='none'
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

export default EventListEditor;