import authOptions from "@utils/authOptions";
import { getTexts } from "@utils/getData";
import { getServerSession } from "next-auth";
import CustomTextEditor from "./CustomTextEditor";

const ServerCustomText = async ({ id } : { id:string }) => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const texts = await getTexts();
    const text = texts.get(id);
    return (
        <>
            {user && user.right >= 2 
                ?
                <>
                    <i className="relative">
                        <CustomTextEditor id={id} text={text} />
                        {text}
                    </i>
                </>
                :
                <i className="relative">
                    {text}
                </i>
            }
        </>
    )
}

export default ServerCustomText;