import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@utils/chadcn";

type input = {
    name: string,
    label: string,
    placeholder?: string,
    type?: string,
    autoComplete?: string,
    className?: string,
    value?: string,
    accept?: string,
};

const inputStyle = "border-2 border-burnt px-2 py-[0.4em] rounded-lg bg-snow text-dark drop-shadow-input outline-none outline-offset-0 transitions placeholder:text-dark placeholder:opacity-50 focus:outline-burnt focus-visible:outline-burnt hover:placeholder:opacity-70 hover:scale-[1.02]"

const FormInput = ({ label, name, type, placeholder, autoComplete, className, value, accept } : input) => {
    return (
        <div className={cn("w-full flex flex-col gap-2 mb-2", className)}>
            {type && type === "textarea" ?
            <>
                <label htmlFor={name} className="pl-2">
                    {label}
                </label>
                <textarea className={inputStyle} id={name} name={name}></textarea>
            </>
            : type === "file" ?
            <>
                <label htmlFor={name} className={cn([inputStyle, "flex gap-[1.5ch] justify-center items-center mx-auto w-full px-10 cursor-pointer"])}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} />
                    <i>{label}</i>
                </label>
                <input
                    className="w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute -z-10"
                    type="file"
                    name={name}
                    id={name}
                    accept={accept}
                />
            </>
            :
            <>
                <label htmlFor={name} className="pl-2">
                    {label}
                </label>
                <input
                    className={inputStyle}
                    type={type ? type : "text"}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    defaultValue={value}
                    accept={accept}
                />
            </>
            }
        </div>
    );
}

export default FormInput;