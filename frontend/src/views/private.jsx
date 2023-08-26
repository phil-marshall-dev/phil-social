import { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';

const Private = () => {
    const username = useAuthStore((state) => state.user().username);
    const [posRes, setPostRes] = useState('');
    const [posts, setPosts] = useState('');
    const inputPlaceholder = `What's on your mind, ${username}?`
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
            const response = await api.post('/posts/', {
                content: e.target[0].value,
            });
            console.log('response is')
            console.log(response)
        } catch (error) {
            console.log('response is')
            console.log(error.response.data)
            setPostRes(error.response.data);
        }
    };
    return (
        <section>
            <h1>Phil Social</h1>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" size="50" placeholder={inputPlaceholder} maxlength="140" />
                <button type="submit">Submit</button>
            </form>
            <h2>Most recent posts from our users</h2>
            {posRes && <p>{posRes}</p>}
        </section>
    );
};

export default Private;
