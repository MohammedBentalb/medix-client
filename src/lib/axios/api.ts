import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    withCredentials: true
})

let accessToken : string | null = null

export const setAccessToken = (token : string | null) => accessToken = token
export const getAccessToken = () => accessToken

api.interceptors.request.use((config) => {
    if(accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config;
})

const authRoutes = [
    '/auth/login',
    '/auth/refresh',
    '/auth/register/patient',
    '/auth/register/doctor',
    '/auth/register/assistant',
];

api.interceptors.response.use(response => response, async error => {
    const originalResquest = error.config;

    const isAuthRoute = authRoutes.some(route => originalResquest.url?.includes(route))

    if(error.response?.status === 401 && !originalResquest._retry && !isAuthRoute){
        originalResquest._retry = true;
        try {
            const response = await api.post(`/auth/refresh`);
            const token = response.data.data.accessToken;
            accessToken = token;
            originalResquest.headers.Authorization = `Bearer ${token}`;
            return api(originalResquest)
        } catch {
            accessToken = null;
            window.location.href = '/auth/sign-in/roles';
            return Promise.reject(error)
        }
    }

    return Promise.reject(error)
})

export default api