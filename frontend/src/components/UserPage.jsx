import { Link } from 'react-router-dom';
import { usePostStore } from '../store/post';
import {  useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UserPage = () => {
    const setUserName = usePostStore(state => state.setUserName)
    const {userName} = useParams()

    useEffect(() => {
        setUserName(userName)

        return () => {
            setUserName()
        }
      }, []);

    return (
        <div>
            <h1>Phil Social</h1>
            <h2>Posts from {userName}</h2>
            <Link to="/">
                <button>Home</button>
            </Link>
        </div>
    );
};


export default UserPage;
