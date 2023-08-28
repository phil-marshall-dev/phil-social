import { useEffect, useState } from 'react';
import { useUnauthenticatedAxios } from '../utils/useAxios';
import Post from '../components/Post';
import { usePostStore } from '../store/post';

const PostList = () => {
    const posts = usePostStore((state) => state.posts)
    const setPosts = usePostStore((state) => state.setPosts)
    const api = useUnauthenticatedAxios();
    useEffect(() => {
        setPosts()
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
