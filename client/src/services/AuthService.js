import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URI;

// Configure axios defaults
axios.defaults.withCredentials = true;

export const register = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}user/register`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { success: response.data };
    } catch (error) {
        if(error.response) {
            return alert(error.response.data.err);
        }
        return { error: "Something went wrong" };
    }
}

export const login = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}user/login`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { success: response.data };
    } catch (error) {
        if (error.response) {
            alert(error.response.data.msg);
            return { error: error.response.data.msg };
        }
        return { error: "Something went wrong" };
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(`${baseUrl}user/logout`, {}, {
            withCredentials: true
        });
        return { success: response.data };
    } catch (error) {
        return { error: "Logout failed" };
    }
}

export default { register, login, logout };