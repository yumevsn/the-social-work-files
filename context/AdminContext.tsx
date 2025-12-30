import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
    isAdmin: false,
    toggleAdmin: () => { },
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('sw_admin_mode') === 'true';
    });

    const toggleAdmin = () => {
        const newValue = !isAdmin;
        setIsAdmin(newValue);
        localStorage.setItem('sw_admin_mode', String(newValue));
    };

    return (
        <AdminContext.Provider value={{ isAdmin, toggleAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};
