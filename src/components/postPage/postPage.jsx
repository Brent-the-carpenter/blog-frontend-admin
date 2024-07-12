import PropTypes from "prop-types";
import useGetPost from "../../api/hooks/useGetPost";
import CommentSection from "./CommentSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useLikePost from "../../api/hooks/useLikePost";
function PostPage() {
  const { postId } = useParams();
  const { error, loading, post } = useGetPost(postId);
  const [likes, setLikes] = useState(0);

  const { likePost, success, likeError, PostLikes, like } = useLikePost();

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      if (PostLikes) {
        setLikes(PostLikes);
      }
    }
  }, [post, PostLikes]);

  if (error) {
    return <h1> {error.message}.</h1>;
  }

  if (loading || !post) return <h1>Loading ....</h1>;
  console.log(post);
  const { createdAt, author, images, content, comments } = post;
  return (
    <div className="postPage m-20 flex flex-col gap-3 p-4 text-3xl max-sm:text-xl">
      {images && images.length > 0 && <img src={images[0]}></img>}
      <h1 className="text-9xl max-sm:text-6xl">{post.title}</h1>
      <hr />
      <br />
      <div>
        <div className="">
          By{" "}
          <strong>
            <em>{author.user_name}</em>
          </strong>
        </div>
        <div>
          Published: <strong>{createdAt}</strong>
        </div>
        <hr />
      </div>
      {images && images.length > 0 && <img src={images[0]} alt="post image" />}
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-start"
      ></div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            likePost(postId);
            setLikes(PostLikes);
          }}
          disabled={like}
        >
          ❤️
        </button>
        {likes}
        {success && <p>{success}</p>}
        {likeError && <p>{likeError}</p>}
      </div>
      <CommentSection postId={postId} comments={comments} />
    </div>
  );
}

PostPage.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default PostPage;
