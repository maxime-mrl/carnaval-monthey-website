import { getTexts } from "@utils/getData";

const CustomText = async ({ id } : { id:string }) => {
    const texts = await getTexts();
    return (
        <>
            {texts.get(id)}
        </>
    )
}

export default CustomText;