import { toast } from "react-toastify"

export const notification = (status: "success"|"error", message: string ) => {
    console.log("errrrr")
    if (status === "success") toast.success(message);
    else toast.error(message)
}