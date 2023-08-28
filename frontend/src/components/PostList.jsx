import { useEffect, useState } from 'react';
import { useUnauthenticatedAxios } from '../utils/useAxios';
import Post from '../components/Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const api = useUnauthenticatedAxios();
    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/');
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchPosts()
      }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => fetchPosts(), 1000);
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, []);

    const postsJsx = posts.map(post => {
        return (
            <Post
                content={post.content}
                owner={post.owner}
                created_at={post.created_at}
            />
        )
    })
    return (
        <div>
            {postsJsx}
        </div>
    );
};

export default PostList;
