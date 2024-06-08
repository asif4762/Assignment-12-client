import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interceptors = axiosSecure.interceptors.response.use(
            response => response,
            async error => {
                console.error('Error tracked in the interceptor', error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logOut();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosSecure.interceptors.response.eject(interceptors);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
