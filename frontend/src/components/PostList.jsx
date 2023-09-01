import { useEffect, useState } from 'react';
import Post from '../components/Post';
import { usePostStore } from '../store/post';

const PostList = () => {
    const getNextPosts = usePostStore((state) => state.getNextPosts)
    const posts = usePostStore((state) => state.posts)
    const setPosts = usePostStore((state) => state.setPosts)
    const userName = usePostStore((state) => state.userName)
    const postsLoading = usePostStore((state) => state.postsLoading)
    useEffect(() => {
        setPosts()
      }, [userName]);
    // useEffect(() => {
    //     const interval = setInterval(() => setPosts(), 5000);
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
    const headerText = userName ? `Most recent posts from ${userName}` : 'Most recent posts from our users'
    return (
        <>
        <h2>{headerText}</h2>
        <div>
            {!postsLoading && 
            postsJsx}
        </div>
        <button onClick={getNextPosts}>Load more posts</button>
        </>
    );
};

export default PostList;
