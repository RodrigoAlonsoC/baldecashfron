import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuccessTast({SuccesChildToast, message}){

    function notify(){
        toast.success(message, {
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
        SuccesChildToast.current = notify
      }, [])
      
    return (
        null
    )
}