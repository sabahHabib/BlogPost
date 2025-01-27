import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blog");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (blogId: string) => {
  navigate(`/blog/${blogId}`);
};

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Latest Blogs</h1>
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">

                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.body.substring(0, 100)}...
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReadMore(blog.id)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No blogs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
