import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/playground');
        }
    }, [navigate]);

    return (
        <>
            {localStorage.getItem('authToken') ? children : null}
        </>
    );
};

export default ProtectedRoute;