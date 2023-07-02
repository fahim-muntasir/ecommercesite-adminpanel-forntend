import axios from "axios";
import { createContext, useContext, useState } from "react";

const CreateContext = createContext();

export const UseContext = () => {
    return useContext(CreateContext);
};

export default function ContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const login = async ({ userName, password }, cd) => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_API_URL}/login`,
                { userName, password }
            );
            localStorage.setItem("Auth", data?.token);

            setIsLogin(true);
            cd(data);
        } catch ({ response }) {
            cd({ error: true, data: response.data });
        }
    };

    const checkLogin = () => {
        setIsLogin(true);
    };

    const value = {
        login,
        isLogin,
        setIsLogin,
    };

    return (
        <CreateContext.Provider value={value}>
            {!loading && children}
        </CreateContext.Provider>
    );
}
