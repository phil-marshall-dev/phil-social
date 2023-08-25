import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';

const Private = () => {
    const username = useAuthStore((state) => state.user().username);
    const [posRes, setPostRes] = useState('');
    const [posts, setPosts] = useState('');
    console.log(posts)
    const api = useAxios();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/posts/');
                setPosts(response.data);
            } catch (error) {
                setPosts(error.response.data);
            }
        };
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/test/', {
                text: e.target[0].value,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    return (
        <section>
            <h2>What's on your mind, {username}?</h2>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" size="50" placeholder="Enter Text" />
                <button type="submit">Submit</button>
            </form>
            <h2>Most recent posts from our users</h2>
            {posRes && <p>{posRes}</p>}
        </section>
    );
};

export default Private;
