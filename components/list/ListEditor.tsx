"use client"
import { useEffect } from 'react';
import FormInput from '@components/FormInput';
import { Button } from '@components/ui/button';
import EditBtn from '@components/EditBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { notification } from '@utils/notifications';
import { addEvent, deleteEvent } from './action';

const initialState = {
    message: "",
}

const ListEditor = ({ list, identifier }: {identifier: string, list: null | string[][]}) => {
    const router = useRouter();
    const [state, formAction] = useFormState(addEvent, initialState);

    useEffect(() => {
        if (state.message === "success") {
            notification("success", "événement ajouté.");
            router.refresh();
        } else if (state.message !== "") notification("error", state.message);
    }, [state, router])

    const toggleEditForm = () => document.querySelector(`[data-target="${identifier}-editor"]`)?.classList.toggle("hidden");
    
    async function handleDelete(elem:string) {
        const result = await deleteEvent(identifier, elem);
        if (result.success) {
            notification("success", "événement supprimé.");
            router.refresh();
        }
        else notification("error", result.error ? result.error : "Erreur inconnue");
    }

    return (
        <>
            <EditBtn onClick={toggleEditForm} />
            <div className='fixed z-50 hidden absolute-center text-lg font-sans container-size flex-center flex-col modal-bg' data-target={`${identifier}-editor`}>
                <button className='absolute right-[1em] top-[1em]' onClick={toggleEditForm} aria-label='Fermer le menu'>
                    <FontAwesomeIcon icon={faXmark} className='text-3xl' />
                </button>
                <h3 className="h4 py-5">Supprimer un élément</h3>
                <div className='grid gap-3 max-h-[8em] overflow-y-scroll px-5'>
                    {list && list.map((elem, i) => (
                        <div key={i} className='flex justify-between gap-3'>
                            <span>{elem[0]},</span>
                            <span>{elem[1] && elem[1]} {elem[2] && "..."}</span>
                            <button onClick={() => {handleDelete(elem[0])}} aria-label='Supprimer'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    ))}
                </div>
                <h3 className="h4 py-5">Ajouter un élément</h3>
                <form action={formAction} className='flex-center flex-col gap-5' data-target={identifier} >
                    <FormInput
                        name='new-elem'
                        label={`Nouvel élément, sous-parties séparées par une virgule`}
                        placeholder='exemple: 2023,Un Monstre Carnaval,du 16 février au 21 février,150ème Carnaval de Monthey'
                        type='text'
                        autoComplete='none'
                    />
                    <input type="hidden" className='hidden' name="identifier" value={identifier} />
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

export default ListEditor;