import authOptions from "@utils/authOptions";
import { getTexts } from "@utils/getData";
import { getServerSession } from "next-auth";
import CustomTextEditor from "./CustomTextEditor";

const CustomText = async ({ id } : { id:string }) => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const texts = await getTexts();
    const text = (texts.get(id) ? texts.get(id) : "Texte non définis");
    return (
        <>
            {user && user.right >= 2 
                ?
                <>
                    <i className="relative">
                        <CustomTextEditor id={id} text={text} />
                        <TextElement text={text} />
                    </i>
                </>
                :
                <TextElement text={text} />
            }
        </>
    )
}

const TextElement = ({ text } : { text: string }) => {
    const textArray = text.split("\n");
    return (
        <>
            {textArray.length > 1 ?
            textArray.map((line:string, i:number) => (
                <i className="relative" key={i}>
                    {line}
                    <br />
                </i>
            ))
            :
            <>
                {text}
            </>
            }
        </>
    )
}

export default CustomText;