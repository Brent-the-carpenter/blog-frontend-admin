import propTypes from "prop-types";
import { Link } from "react-router-dom";
export default function PostCard({ post }) {
  return (
    <>
      <div className="postCard  " key={post._id}>
        <h2 className="col-start-1 col-end-5 self-center text-xl font-bold">
          {post.title}
        </h2>
        <img
          className=" w-24 col-start-4 row-start-2 row-end-4"
          src={post?.thumbNail}
          alt="Thumb nail"
        />
        <h3 className=" flex row-start-2 row-end-3 col-start-1 col-end-3 ">
          Written by: {post.author.first_name}
        </h3>
        <p className=" flex row-start-3 col-start-1 col-end-3 justify-start ">
          Created on: {post.createdAt}
        </p>
        <Link
          to={`/posts/${post._id}`}
          className="btn col-start-3 row-start-3 row-end-4 justify-self-center"
        >
          View post
        </Link>
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
    author: propTypes.shape({
      first_name: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
