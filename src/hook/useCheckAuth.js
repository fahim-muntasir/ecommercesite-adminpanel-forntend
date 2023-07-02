import { useEffect, useState } from "react";
import { UseContext } from "../context/context";

export default function useCheckAuth() {
    const [checkUserAuth, setCheckUserAuth] = useState();
    const { setIsLogin } = UseContext();

    useEffect(() => {
        const localAuth = localStorage?.getItem("Auth");

        if (localAuth) {
            setIsLogin(true);
        }

        setCheckUserAuth(true);
    }, [setCheckUserAuth, setIsLogin]);

    return checkUserAuth;
}
