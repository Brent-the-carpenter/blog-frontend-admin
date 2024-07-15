import useUserContext from "../../context/userContext/useUserContext";
import useGetUsersPost from "../../api/hooks/useGetUsersPost";
import PostCard from "../PostsPage/PostCard";

function HomePage() {
  const { token, userName } = useUserContext();
  const { usersPost, loading, error } = useGetUsersPost();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className=" flex-1">
      <h1 className="text-4xl">Welcome to Carpenters Blog editor!</h1>

      {token ? (
        <>
          <h2 className="text-2xl">How are you doing today {userName}</h2>
          <br />
          <h3>Most top five most liked blogs</h3>
          <div className="mt-2 flex flex-1 flex-col items-center gap-2">
            {usersPost && usersPost.length > 0 ? (
              usersPost.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <h2>No post available</h2>
            )}
          </div>
        </>
      ) : (
        <h2 className="text-2xl">
          Please login or sign up to view , create and update post!
        </h2>
      )}
    </div>
  );
}
export default HomePage;
