import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit ,FaPlus} from "react-icons/fa";
import { useBlogs } from "../hooks/useBlogs";

const HomePage: React.FC = () => {
  const { blogs, fetchBlogs, error, deleteBlog, loading } = useBlogs();

  useEffect(() => {
    fetchBlogs();
  }, []);
return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blogs</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex">{blog.title}</h5>
                  <p className="card-text mt-4 mb-4">
                    {blog.body.substring(0, 100)}...

                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-primary ms-2"
                    >
                      Read More
                    </Link>
                  </p>

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
        ) : (
          <div className="col-12 text-center">
            <p>No blogs available at the moment.</p>
          </div>
        )}
      </div>
      <Link to="/blog/add" className="btn btn-success mb-3">
        Add New Blog <FaPlus />
      </Link>
    </div>

  );
};

export default HomePage;
