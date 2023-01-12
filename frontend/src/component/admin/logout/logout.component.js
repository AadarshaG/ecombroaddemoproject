import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout(){
    const navigate = useNavigate();
    localStorage.clear();

    useEffect(()=>{
        navigate('/login');
    })

    return null;
}