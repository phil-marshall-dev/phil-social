import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { useUnauthenticatedAxios } from '../utils/useAxios';

const api = useUnauthenticatedAxios();

const usePostStore = create((set) => ({
    posts: [],
    setPosts: async () => {
        try {
            const response = await api.get('/posts/');
            set({posts: response.data});
        } catch (error) {
            console.log(error);
        }
    },
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', usePostStore);
}

export { usePostStore };
