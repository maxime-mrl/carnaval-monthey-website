import authOptions from "@utils/authOptions";
import { getTexts } from "@utils/getData";
import { getServerSession } from "next-auth";
import CustomTextEditor from "./CustomTextEditor";

const ServerCustomText = async ({ id } : { id:string }) => {
    const session = await getServerSession(authOptions);
    const user = session && session.user ? session.user as { _id: string, username: string, right: number } : null;
    const texts = await getTexts();
    return (
        <>
            {user && user.right >= 2 
                ?
                <>
                    <i className="relative">
                        <CustomTextEditor id={id} />
                        {texts.get(id)}
                    </i>
                </>
                :
                <i className="relative">
                    {texts.get(id)}
                </i>
            }
        </>
    )
}

export default ServerCustomText;