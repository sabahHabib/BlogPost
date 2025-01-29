import React, { useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBlogs } from "../hooks/useBlogs";

const BlogList: React.FC = () => {
  const { blogs, fetchBlogs, deleteBlog, loading, error } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleReadMore = (blogId: number) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Blogs</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {loading ? (
          <div>Loading blogs...</div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="col-md-10 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.body.slice(0, 100)}...</p>


                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleReadMore(blog.id)}
                  >
                    Read More
                  </button>

                  <Link
                    to={`/blog/edit/${blog.id}`}
                    className="btn btn-warning me-2"
                  >
                    Edit <FaEdit />
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBlog(blog.id)}
                    disabled={loading}
                  >
                    Delete <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/blog/add" className="btn btn-success mb-3">
        Add New Blog <FaPlus />
      </Link>
    </div>
  );
};

export default BlogList;
