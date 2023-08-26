const Post = ({owner, created_at, content}) => {
    const datetime = new Date(created_at)
    
    return (
    <div className="social-media-post">
        <div className="post-header">
            <a className="username" href={`users/${owner}`}>@{owner}</a>
            <div className="timestamp">{datetime.toUTCString()}</div>
        </div>
        <div className="post-content">{content}</div>
    </div>
    );
}

export default Post;
