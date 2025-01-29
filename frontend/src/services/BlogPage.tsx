import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { useBlogs, Blog } from "../hooks/useBlogs";


const BlogPage = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const { fetchBlogById, error, loading } = useBlogs();
  const [blog, setBlog] = useState<Blog | null>(null);
  useEffect(() => {
    if (blogId) {
      const getBlog = async () => {
        const fetchedBlog = await fetchBlogById(Number(blogId));
        setBlog(fetchedBlog);
      };
      getBlog();
    }
  }, [blogId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>

      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">Error: {error}</div>;
  }

  if (!blog) {
    return <div className="alert alert-warning" role="alert">No blog found with this ID.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card ">

        <div className="card-header d-flex align-items-center text-secondary">
          <div>
            <h4 className="mb-0 ">{blog.title}</h4>
          </div>

        </div>

        <div className="card-body">
          <p className="">{blog.body}</p>
        </div>
        <div className="card-footer text-center">
        </div>
      </div>
    </div>

  );
};

export default BlogPage;
