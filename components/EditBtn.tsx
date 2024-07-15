import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type input = {
    name: string,
    label: string,
    placeholder: string,
    type?: string,
    autoComplete?: string,
    className?: string,
    value?: string,
};

const EditBtn = ({ onClick } : { onClick: () => void }) => {
    return (
        <button
            className="absolute z-10 left-[-0.5em] top-[-0.8em] cursor-pointer"
            onClick={onClick}
            aria-label="Editer l'élément"
        >
            <FontAwesomeIcon className="bg-arylide bg-opacity-70 text-[1.5rem] p-[0.4em] rounded-[50%] border-solid border-current border-4" icon={faPenToSquare} />
        </button>
    );
}

export default EditBtn;