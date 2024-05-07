import { cn } from "@utils/chadcn";

type input = {
    name: string,
    label: string,
    placeholder: string,
    type?: string,
    autoComplete?: string,
    className?: string,
};

const inputStyle = "border-2 border-burnt px-2 py-[0.4em] rounded-lg bg-snow drop-shadow-input outline-none outline-offset-0 transitions placeholder:text-dark placeholder:opacity-50 focus:outline-burnt focus-visible:outline-burnt hover:placeholder:opacity-70 hover:scale-[1.02]"

const FormInput = ({ label, name, type, placeholder, autoComplete, className } : input) => {
    return (
        <div className={cn("w-full flex flex-col gap-2 mb-2", className)}>
            <label htmlFor={name} className="pl-2">
                {label}
            </label>
            {type && type === "textarea" ?
            <textarea className={inputStyle}>

            </textarea>
            :
            <input
                className={inputStyle}
                type={type ? type : "text"}
                name={name}
                id={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
            }
        </div>
    );
}

export default FormInput;