import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api'
});

/*Auth API */

export const signIn = async (userData) => await httpClient.post('/users/sign-in', userData )

export const signUp = async (userData) => await httpClient.post('/users/sign-up', userData );

export const logOut = async () => {
    localStorage.clear()
}

export const refreshSession = async() => {
    const refreshToken = localStorage.getItem('refreshToken')
    const {data} = await httpClient.post('/users/refresh', {refreshToken});
    return data;
}
httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accesToken');
    if(token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        }
    }
    return config;
}, (err) => Promise.reject(err));

httpClient.interceptors.response.use((response) => {
    if(response.data.tokens)  {
        const {data: {tokens: {accesToken, refreshToken}}} = response;
        localStorage.setItem('accesToken', accesToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
}, (err) => {
    if( err.response.status === 403 && localStorage.getItem('refreshToken')) {
        console.log('REFRESH');
        return refreshSession()
        .then(()=> {
            console.log('Retry request');
            return httpClient(err.config)
        });
    } else if(err.response.status === 401) {
        logOut();
    } else {
        return Promise.reject(err);
    }


})






/*Chat API*/

export const createChat = async (data) => await httpClient.post('/chats/', data);

export const addNewMessage = async (chatId, data) => await httpClient.post(`/chats/${chatId}`, data);

export const getChatWithMessages = async (chatId) => await httpClient.get(`/chats/${chatId}`);

export const getAllUsersChats = async () => await httpClient.get(`/chats/user/all`);

export const addUserToChat = async (chatId, userId) => await httpClient.put(`/chats/${chatId}`, {userId});