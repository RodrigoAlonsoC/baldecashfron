import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorToast({ErrorChildToast, message}){

    function notify(){
        toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    useEffect(() => {
        ErrorChildToast.current = notify
      }, [])
      
    return (
        null
    )
}