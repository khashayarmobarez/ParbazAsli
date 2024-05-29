    import axios from 'axios';

    const BASE_URL = 'https://api.par-baz.ir/api'

    export const fetchAuthSettings = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Auth/GetAuthenticationSettings`);
            return response.data.data;
            } catch (error) {
            console.error('Failed to fetch authentication settings:', error);
            throw error;
            }
        };