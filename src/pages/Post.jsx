import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { Link, useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/configure";
import { Container, Button } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border p-2 rounded-xl">
          <img
            className="rounded-xl"
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
        {isAuthor && (
            <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="mr-3" bgColor="bg-red-500">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
        </div>
        <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
            {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
