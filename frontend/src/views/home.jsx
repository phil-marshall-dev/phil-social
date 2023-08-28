import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import PostList from '../components/PostList';
import { useAxios } from '../utils/useAxios';
const Home = () => {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);
    return (
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    );
};

const LoggedInView = () => {
    const api = useAxios();
    const username = useAuthStore((state) => state.user().username);
    const text = `What's on your mind, ${username}?`
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/posts/', {
                content: e.target[0].value,
            });
        } catch (error) {
        }
    };

    return (
        <div>
            <h1>Phil Social</h1>
            <h2>{text}</h2>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" size="50" maxlength="140" />
                <button type="submit">Submit</button>
                <Link to="/logout">
                    <button>Logout</button>
                </Link>
            </form>
        </div>
    );
};

export const LoggedOutView = () => {
    return (
        <div>
            <h1>Phil Social</h1>
            <h2>Login or register to make a post</h2>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
