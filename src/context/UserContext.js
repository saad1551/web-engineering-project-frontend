// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('jwt_payload'));

        if (payload) {
            if (payload.buyer) {
                setUserRole('buyer');
            } else if (payload.seller) {
                setUserRole('seller');
            }
        } else {
            setUserRole(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserContext.Provider>
    );
};
