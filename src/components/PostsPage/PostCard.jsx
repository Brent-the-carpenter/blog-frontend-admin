import propTypes from "prop-types";
import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  return (
    <>
      <div
        className="postCard gap-4 w-3/4 max-sm:flex-col-reverse   "
        key={post._id}
      >
        <div className="flex justify-center flex-col gap-2 ">
          <Link
            to={"/posts/" + post._id + "/delete"}
            className="btn col-start-4 row-start-3 row-end-4 justify-self-center"
          >
            Delete post
          </Link>
          <Link
            to={"/posts/" + post._id + "/update"}
            className="btn col-start-6  row-start-3 row-end-4 justify-self-center"
          >
            Update post
          </Link>
          <Link
            to={`/posts/${post._id}`}
            className="btn col-start-5 row-start-3 row-end-4 justify-self-center"
          >
            View post
          </Link>
        </div>
        <div className=" flex flex-col flex-grow gap-2 p-2 ">
          <h2 className="text-xl">{post.title}</h2>
          <div>
            <h3 className="   ">Written by: {post.author.first_name}</h3>
            <p className="  ">Created on: {post.createdAt}</p>
            <p>❤️{post.likes}</p>
          </div>
        </div>
        <div className="flex justify-center align-middle">
          <img className=" " src={post?.thumbNail} alt="Thumb nail" />
        </div>
      </div>
      <hr className=" w-3/4 max-sm:w-full" />
    </>
  );
}
PostCard.propTypes = {
  post: propTypes.shape({
    _id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    createdAt: propTypes.string.isRequired,
    thumbNail: propTypes.string,
    likes: propTypes.number,
    author: propTypes.shape({
      first_name: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
