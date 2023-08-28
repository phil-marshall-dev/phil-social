import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { useUnauthenticatedAxios } from '../utils/useAxios';

const api = useUnauthenticatedAxios();

const usePostStore = create((set, get) => ({
    posts: [],
    userName: null,
    setUserName: (userName) => {
        set({ userName: userName })
    },
    setPosts: async () => {
        console.log('setting posts')
        try {
            if (!get().userName) {
                const response = await api.get('/posts/');
                set({posts: response.data});
            } else {
                const response = await api.get(`/posts?username=${get().userName}`);
                console.log(
                    `/posts?username=${get().userName}/`
                )
                set({posts: response.data});            
            }
        } catch (error) {
            console.log(error);
        }
    },
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', usePostStore);
}

export { usePostStore };
