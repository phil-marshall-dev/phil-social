import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';
import PostList from './PostList';

const SubmitPostForm = () => {
    const username = useAuthStore((state) => state.user().username);
    const inputPlaceholder = `What's on your mind, ${username}?`
    const api = useAxios();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/posts/', {
                content: e.target[0].value,
            });
            e.target[0].value = ''
            fetchPosts()
        } catch (error) {
        }
    };


    return (
        <section>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" size="50" placeholder={inputPlaceholder} maxlength="140" />
                <button type="submit">Submit</button>
                <Link to="/logout">
                    <button>Logout</button>
                </Link>
            </form>
            <PostList/>
        </section>
    );
};

export default SubmitPostForm;
