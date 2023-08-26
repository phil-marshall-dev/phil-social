import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';
import Post from '../components/Post';

const Private = () => {
    const username = useAuthStore((state) => state.user().username);
    const [posts, setPosts] = useState([]);
    const inputPlaceholder = `What's on your mind, ${username}?`
    const api = useAxios();
    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/');
            setPosts(response.data);
        } catch (error) {
            setPosts(error.response.data);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/posts/', {
                content: e.target[0].value,
            });
            fetchPosts()
        } catch (error) {
        }
    };

    const postsJsx = posts.map(post => {
        return (
            <Post
                content={post.content}
                owner={post.owner}
                created_at={post.created_at}
            >

            </Post>
        )
    })
    return (
        <section>
            <h1>Phil Social</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" size="50" placeholder={inputPlaceholder} maxlength="140" />
                <button type="submit">Submit</button>
            </form>
            <h2>Most recent posts from our users</h2>
            {postsJsx}
        </section>
    );
};

export default Private;
