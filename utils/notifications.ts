import { toast } from "react-toastify"

export const notification = (status: "success"|"error", message: string ) => {
    if (status === "success") toast.success(message);
    else toast.error(message)
}