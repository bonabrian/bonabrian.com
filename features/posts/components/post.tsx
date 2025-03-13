import PostContent from './post-content';
import PostFooter from './post-footer';
import PostHeader from './post-header';
import PostThumbnail from './post-thumbnail';

const Post = () => {
  return (
    <div className="relative">
      <PostHeader />
      <PostThumbnail />
      <PostContent />
      <PostFooter />
    </div>
  );
};

export default Post;
