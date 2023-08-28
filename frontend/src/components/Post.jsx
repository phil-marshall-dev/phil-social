import { Link } from 'react-router-dom';

const Post = ({owner, created_at, content}) => {
    const datetime = new Date(created_at)
    
    return (
    <div className="social-media-post">
        <div className="post-header">
            <Link to={`users/${owner}`} className="username">
                @{owner}
            </Link>
            <div className="timestamp">{datetime.toUTCString()}</div>
        </div>
        <div className="post-content">{content}</div>
    </div>
    );
}

export default Post;
