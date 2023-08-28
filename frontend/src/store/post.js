import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import { useUnauthenticatedAxios } from '../utils/useAxios';

const api = useUnauthenticatedAxios();

const usePostStore = create((set, get) => ({
    posts: [],
    userName: null,
    postsLoading: false,
    nextLink: null,
    setUserName: (userName) => {
        set({ userName: userName })
    },
    clearPosts: () => set({posts: []}),
    getNextPosts: async () => {
        try {
            const nextLink = get().nextLink;
            if (nextLink) {
                const response = await api.get(nextLink);
                set((state) => {
                    return {posts: state.posts.concat(response.data.results)}
                });
                set({nextLink: response.data.next})
                set({ postsLoading: false })
            }
        } catch (error) {
            console.log(error);
        }
    },
    setPosts: async () => {
        set({ postsLoading: true })
        try {
            if (!get().userName) {
                const response = await api.get('/posts/');
                set({posts: response.data.results});
                set({nextLink: response.data.next})
            } else {
                const response = await api.get(`/posts?username=${get().userName}`);
                set({posts: response.data.results});
                set({nextLink: response.data.next})      
            }
            set({ postsLoading: false })
        } catch (error) {
            console.log(error);
        }
    },
}));

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', usePostStore);
}

export { usePostStore };
